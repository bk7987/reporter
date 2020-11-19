import React from 'react';
import { User } from '../models';

interface LoginProps {
  user: User;
}

export const Login: React.FC<LoginProps> = ({ user }) => {
  return (
    <div className="mx-auto max-w-screen-sm bg-white">
      <div>Login</div>
      <div>{user.email}</div>
    </div>
  );
};
