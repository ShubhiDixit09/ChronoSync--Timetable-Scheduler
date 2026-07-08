import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';

const links = [
  { to: '/admin/departments', label: 'Departments' },
  { to: '/admin/faculty', label: 'Faculty' },
  { to: '/admin/rooms', label: 'Rooms' },
  { to: '/admin/subjects', label: 'Subjects' },
  { to: '/admin/batches', label: 'Batches' },
  { to: '/admin/generate', label: 'Generate timetable' },
  { to: '/admin/approvals', label: 'Approval queue' },
];

export default function AdminDashboard() {
  return (
    <div>
      <Navbar title="ChronoSync — Admin" />
      <div style={{ display: 'flex' }}>
        <Sidebar links={links} />
        <div className="page">
          <h2>Welcome, Admin</h2>
          <p>Use the sidebar to manage master data or generate a new timetable.</p>
        </div>
      </div>
    </div>
  );
}
