import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';

const links = [{ to: '/student/timetable', label: 'My timetable' }];

export default function StudentDashboard() {
  return (
    <div>
      <Navbar title="ChronoSync — Student" />
      <div style={{ display: 'flex' }}>
        <Sidebar links={links} />
        <div className="page">
          <h2>Welcome</h2>
          <p>View your batch's published timetable from the sidebar.</p>
        </div>
      </div>
    </div>
  );
}
