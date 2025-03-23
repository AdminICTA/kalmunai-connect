
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/auth/auth-context';

interface UserContextType {
  username: string;
  email: string;
  userId: string;
  role: string | null;
  department: string | null;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
}

interface UserInfo {
  username: string;
  email: string;
  userId: string;
  role: string | null;
  department: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: user?.username || '',
    email: user?.email || '',
    userId: user?.id || '',
    role: user?.role_id || null,
    department: user?.department_id || null,
  });

  // Update user info when auth context changes
  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || '',
        email: user.email || '',
        userId: user.id || '',
        role: user.role_id || null,
        department: user.department_id || null,
      });
    }
  }, [user]);

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider 
      value={{ 
        ...userInfo, 
        updateUserInfo 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
