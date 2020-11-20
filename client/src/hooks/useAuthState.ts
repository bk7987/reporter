import { useState, useEffect } from 'react';
import { noUser, setAuthStateListener } from '../auth';
import { User } from '../models';

interface UseAuthStateOptions {
  autoLogin: boolean;
}

export const useAuthState = (
  options: UseAuthStateOptions = {
    autoLogin: false,
  }
) => {
  const [user, setUser] = useState(noUser);

  const onAuthStateChanged = (newUser: User) => {
    setUser(newUser);
  };

  useEffect(() => {
    return setAuthStateListener(onAuthStateChanged, options.autoLogin);
  }, [onAuthStateChanged]);

  return user;
};
