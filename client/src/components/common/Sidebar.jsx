import React from 'react';
import { NavLink } from 'react-router-dom';

// links: [{ to, label }]
export default function Sidebar({ links }) {
  return (
    <nav style={{ width: 200, padding: 16 }}>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} style={{ display: 'block', margin: '8px 0' }}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
