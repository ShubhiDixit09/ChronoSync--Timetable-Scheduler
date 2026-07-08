import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';

const links = [
  { to: '/teacher/preferences', label: 'My preferences' },
  { to: '/teacher/schedule', label: 'My schedule' },
];

export default function TeacherDashboard() {
  return (
    <div>
      <Navbar title="ChronoSync — Teacher" />
      <div style={{ display: 'flex' }}>
        <Sidebar links={links} />
        <div className="page">
          <h2>Welcome</h2>
          <p>Set your preferences or view your assigned schedule from the sidebar.</p>
        </div>
      </div>
    </div>
  );
}
