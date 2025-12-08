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
  changePassword: (newPassword: string) => Promise<{ error?: string }>;
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

  // Fetch user role from user_roles table (security best practice)
  const fetchUserRole = async (userId: string): Promise<'admin' | 'user'> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('[AuthContext] Error fetching user role:', error);
        return 'user';
      }
      
      return (data?.role as 'admin' | 'user') || 'user';
    } catch (error) {
      console.error('[AuthContext] Error in fetchUserRole:', error);
      return 'user';
    }
  };

  // Fetch user profile data from Supabase
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log('[AuthContext] Fetching profile for user:', supabaseUser.id, supabaseUser.email);
      
      // Buscar perfil por user_id (agora cada perfil tem user_id único)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .maybeSingle();
      
      console.log('[AuthContext] Profile search by user_id result:', { profile, profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('[AuthContext] Error fetching profile:', profileError);
        return null;
      }

      if (!profile) {
        console.log('[AuthContext] No profile found for user_id:', supabaseUser.id);
        return null;
      }

      // Fetch role from user_roles table (security best practice)
      const role = await fetchUserRole(supabaseUser.id);

      console.log('[AuthContext] Profile loaded successfully:', {
        name: profile.name,
        role: role,
        profileId: profile.id,
        userId: profile.user_id,
        email: profile.email
      });

      return {
        id: supabaseUser.id,
        email: profile.email,
        name: profile.name,
        matricula: profile.matricula,
        role: role,
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
      (event, session) => {
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

  // --- Logout automático por inatividade ---
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

        // Add default 'user' role to user_roles table
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: data.user.id, role: 'user' });

        if (roleError) {
          console.error('Role insert error:', roleError);
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

  const changePassword = async (newPassword: string): Promise<{ error?: string }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('[AuthContext] Change password error:', error);
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('[AuthContext] Change password exception:', error);
      return { error: 'Ocorreu um erro ao alterar a senha. Tente novamente.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, changePassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
