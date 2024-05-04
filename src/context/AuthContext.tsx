// context/AuthContext.tsx
import { RootState } from '@/store/store';
import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

type UserRole = 'admin' | 'merchant' | 'client';

interface AuthContextType {
  userRole: UserRole;
}

interface Props {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({ userRole: 'client' });
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const userRole = useSelector((state: RootState) => state?.user?.user?.user_role);


  return (
    <AuthContext.Provider value={{ userRole: userRole || 'client' }}>
      {children}
    </AuthContext.Provider>
  );
};
