import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('chronosync_user');
    return stored ? JSON.parse(stored) : null;
    // NOTE: swap sessionStorage for in-memory state if this ever runs as a
    // Claude.ai artifact — browser storage APIs are not supported there.
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('chronosync_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('chronosync_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
