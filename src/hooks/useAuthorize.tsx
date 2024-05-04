// hooks/useAuthorize.tsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

type RoleCheck = (userRole: string) => boolean;

export const useAuthorize = (check: RoleCheck, redirectTo: string) => {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!check(userRole)) {
      router.push(redirectTo);
    }
  }, [userRole]);

  return userRole;
};
