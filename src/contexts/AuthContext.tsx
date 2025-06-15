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
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return {
        id: supabaseUser.id,
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
        console.log('AuthContext: Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile with a small delay to ensure database is ready
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(session.user);
            setUser(userProfile);
            setIsLoading(false);
          }, 100);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthContext: Checking existing session:', session?.user?.email);
      if (session?.user) {
        fetchUserProfile(session.user).then(userProfile => {
          setUser(userProfile);
          setSession(session);
          setIsLoading(false);
        });
      } else {
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
        toast({
          title: "Sessão expirada por inatividade",
          description: "Você foi desconectado por ficar 15 minutos sem usar o sistema.",
          variant: "destructive",
        });
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
