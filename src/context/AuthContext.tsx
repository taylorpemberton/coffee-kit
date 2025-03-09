import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { validateUsername } from '../utils/usernameBlacklist';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  usernameChangesRemaining: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  isLoading: boolean;
  updateUsername: (username: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For demo purposes, we'll start with a mock user
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      username: 'tp3mb',
      usernameChangesRemaining: 2
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would validate credentials with an API
      setUser({
        id: '1',
        name: 'Demo User',
        email: email,
        username: 'tp3mb',
        usernameChangesRemaining: 2
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would register a new user with an API
      setUser({
        id: '1',
        name: name,
        email: email,
        username: email.split('@')[0], // Default username from email
        usernameChangesRemaining: 2
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsername = async (username: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'You must be logged in to change your username' };
    }

    if (user.usernameChangesRemaining <= 0) {
      return { success: false, message: 'You have used all your free username changes' };
    }

    // Validate the username
    const validation = validateUsername(username);
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    // In a real app, this would make an API call to check if the username is taken
    // For now, we'll simulate a successful username change
    setUser({
      ...user,
      username,
      usernameChangesRemaining: user.usernameChangesRemaining - 1
    });

    return { success: true, message: 'Username updated successfully' };
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would send a password reset email
      console.log(`Password reset email sent to ${email}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would reset the password using the token
      console.log(`Password reset with token: ${token}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      register,
      forgotPassword,
      resetPassword,
      isLoading,
      updateUsername
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 