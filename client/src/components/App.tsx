import React from 'react';
import { noUser } from '../auth';
import { useAuthState } from '../hooks/useAuthState';
import { Login } from './Login';

export const App: React.FC = () => {
  const user = useAuthState(noUser, { autoLogin: false });

  return (
    <div className="container mx-auto px-6">
      {user.loggedIn ? <div>Welcome, {user.email}!</div> : <Login user={user} />}
    </div>
  );
};
