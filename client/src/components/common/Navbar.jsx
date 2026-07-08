import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid #e2e2e0' }}>
      <strong>{title || 'ChronoSync'}</strong>
      {user && (
        <div>
          <span style={{ marginRight: 12 }}>{user.name} ({user.role})</span>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
}
