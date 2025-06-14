
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
          
          // Try to find the profile by multiple criteria to ensure we find the right one
          const userProfile = parsedProfiles.find((p: any) => 
            p.userId === user.id || 
            p.matricula === user.matricula ||
            p.email === user.name || // In case email is stored as name
            p.name === user.name
          );
          
          console.log('AuthContext: Current user:', user);
          console.log('AuthContext: Found user profile:', userProfile);
          
          if (userProfile && userProfile.role && userProfile.role !== user.role) {
            console.log(`AuthContext: User role changed from ${user.role} to ${userProfile.role}`);
            const updatedUser = { ...user, role: userProfile.role };
            setUser(updatedUser);
            localStorage.setItem('mprj_user', JSON.stringify(updatedUser));
            
            // Force a page reload to ensure the protected route re-evaluates
            if (userProfile.role === 'user' && window.location.pathname === '/admin') {
              window.location.href = '/';
            }
          }
        }
      }
    };

    // Listen for both storage events and manual dispatch events
    const handleManualStorageChange = () => handleStorageChange();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage', handleManualStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleManualStorageChange);
    };
  }, [user]);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      // Check if there's an existing profile for this user that might have admin role
      const profiles = localStorage.getItem('mprj_profiles');
      let userRole = foundUser.role;
      
      if (profiles) {
        const parsedProfiles = JSON.parse(profiles);
        const userProfile = parsedProfiles.find((p: any) => 
          p.userId === foundUser.id || 
          p.matricula === foundUser.matricula ||
          p.name === foundUser.name
        );
        
        if (userProfile && userProfile.role) {
          userRole = userProfile.role;
        }
      }
      
      // Ensure usuario01 is always admin
      const finalRole = username === 'usuario01' ? 'admin' as const : userRole;
      
      const userWithRole = { 
        ...foundUser, 
        role: finalRole
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
