import React from 'react';

import { useTokenStore } from '@/store/Store';
import { Navigate } from 'react-router-dom';
function AuthLayout({ children, authenticate = true }) {
  const token = useTokenStore((state) => state.token);
  if (authenticate && !token) {
    return <Navigate to={'/login'} />;
  }

  return <div>{children}</div>;
}

export default AuthLayout;
