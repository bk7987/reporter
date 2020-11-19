import { useState, useEffect } from 'react';
import { setAuthStateListener } from '../auth';
import { User } from '../models';

interface UseAuthStateOptions {
  autoLogin: boolean;
}

export const useAuthState = (
  initialUser: User,
  options: UseAuthStateOptions = {
    autoLogin: false,
  }
) => {
  const [user, setUser] = useState(initialUser);

  const onAuthStateChanged = (newUser: User) => {
    setUser(newUser);
  };

  useEffect(() => {
    return setAuthStateListener(onAuthStateChanged, options.autoLogin);
  }, [onAuthStateChanged]);

  return user;
};
