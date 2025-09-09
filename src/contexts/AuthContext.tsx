import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { useAutoLogout } from "../hooks/useAutoLogout";
import { toast } from "../components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  matricula: string;
  role: 'admin' | 'user';
  profileId?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string, name: string, matricula: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data from Supabase
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log('[AuthContext] Fetching profile for user:', supabaseUser.id, supabaseUser.email);
      console.log('[AuthContext] User metadata:', supabaseUser.user_metadata);
      
      // NOVA ESTRATÉGIA: Buscar sempre por email primeiro para evitar conflitos de user_id
      const { data: profileByEmail, error: emailError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', supabaseUser.email)
        .maybeSingle();
      
      console.log('[AuthContext] Profile search by email result:', { profileByEmail, emailError });

      if (emailError && emailError.code !== 'PGRST116') {
        console.error('[AuthContext] Error fetching profile by email:', emailError);
        return null;
      }

      if (!profileByEmail) {
        console.log('[AuthContext] No profile found for email:', supabaseUser.email);
        return null;
      }

      // Sempre atualizar o user_id para garantir consistência
      if (profileByEmail.user_id !== supabaseUser.id) {
        console.log('[AuthContext] Updating profile user_id from', profileByEmail.user_id, 'to', supabaseUser.id);
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ user_id: supabaseUser.id })
          .eq('id', profileByEmail.id);
          
        if (updateError) {
          console.error('[AuthContext] Error updating profile user_id:', updateError);
        } else {
          console.log('[AuthContext] Profile user_id updated successfully');
        }
      }

      const profile = { ...profileByEmail, user_id: supabaseUser.id };

      console.log('[AuthContext] Profile loaded successfully:', {
        name: profile.name,
        role: profile.role,
        profileId: profile.id,
        userId: profile.user_id,
        email: profile.email
      });

      return {
        id: supabaseUser.id, // Garantir que seja sempre o auth.uid()
        email: profile.email,
        name: profile.name,
        matricula: profile.matricula,
        role: profile.role || 'user',
        profileId: profile.id
      };
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('AuthContext: Initializing auth state');

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth state changed:', { event, session: !!session, userEmail: session?.user?.email });
        
        setSession(session);
        
        if (session?.user) {
          console.log('[AuthContext] User logged in, fetching profile...');
          // Fetch user profile with a small delay to ensure database is ready
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(session.user);
            setUser(userProfile);
            console.log('[AuthContext] User profile set from auth change:', userProfile);
            setIsLoading(false);
          }, 100);
        } else {
          console.log('[AuthContext] No session, clearing user');
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthContext] Checking existing session:', { session: !!session, userEmail: session?.user?.email });
      if (session?.user) {
        fetchUserProfile(session.user).then(userProfile => {
          setUser(userProfile);
          setSession(session);
          console.log('[AuthContext] Initial user profile set:', userProfile);
          setIsLoading(false);
        });
      } else {
        console.log('[AuthContext] No existing session found');
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // --- NOVO: Logout automático por inatividade ---
  useAutoLogout(
    15 * 60 * 1000, // 15 minutos em ms
    () => {
      if (user) {
        toast(
          "Sessão expirada por inatividade",
          {
            description: "Você foi desconectado por ficar 15 minutos sem usar o sistema.",
            className: "bg-destructive text-destructive-foreground"
          }
        );
        void logout();
      }
    }
  );
  // --- FIM NOVO ---

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { error: error.message };
      }

      console.log('Login successful:', data.user?.email);
      return {};
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Erro inesperado durante o login' };
    }
  };

  const signup = async (email: string, password: string, name: string, matricula: string): Promise<{ error?: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name,
            matricula: matricula
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { error: error.message };
      }

      // If user was created successfully, update their profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: name,
            matricula: matricula
          })
          .eq('user_id', data.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      console.log('Signup successful:', data.user?.email);
      return {};
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'Erro inesperado durante o cadastro' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
