import React from 'react';
import { noUser } from '../auth';
import { useAuthState } from '../hooks/useAuthState';
import { User } from '../models';
import { Login } from './Login';

export const AuthContext = React.createContext<User>(noUser);

export const App: React.FC = () => {
  const user = useAuthState({ autoLogin: false });

  return (
    <AuthContext.Provider value={user}>
      <div className="container mx-auto px-6">
        {user.loggedIn ? <div>Welcome, {user.email}!</div> : <Login />}
      </div>
    </AuthContext.Provider>
  );
};
