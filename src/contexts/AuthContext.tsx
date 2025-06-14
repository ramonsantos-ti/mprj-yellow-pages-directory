
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mprj_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure usuario01 is always admin
      if (parsedUser.username === 'usuario01') {
        parsedUser.role = 'admin';
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  // Listen for storage changes to sync user role updates across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('AuthContext: Storage event detected, checking for profile updates');
      if (user) {
        const profiles = localStorage.getItem('mprj_profiles');
        if (profiles) {
          const parsedProfiles = JSON.parse(profiles);
          const userProfile = parsedProfiles.find((p: any) => p.userId === user.id);
          
          if (userProfile && userProfile.role !== user.role) {
            console.log(`AuthContext: User role changed from ${user.role} to ${userProfile.role}`);
            const updatedUser = { ...user, role: userProfile.role };
            setUser(updatedUser);
            localStorage.setItem('mprj_user', JSON.stringify(updatedUser));
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      // Ensure usuario01 is always admin
      const userWithRole = { 
        ...foundUser, 
        role: username === 'usuario01' ? 'admin' as const : foundUser.role 
      };
      setUser(userWithRole);
      localStorage.setItem('mprj_user', JSON.stringify(userWithRole));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mprj_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
