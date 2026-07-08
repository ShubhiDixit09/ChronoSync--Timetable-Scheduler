import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AdminDashboard from '../portals/admin/AdminDashboard';
import ManageDepartments from '../portals/admin/ManageDepartments';
import ManageFaculty from '../portals/admin/ManageFaculty';
import ManageRooms from '../portals/admin/ManageRooms';
import ManageSubjects from '../portals/admin/ManageSubjects';
import ManageBatches from '../portals/admin/ManageBatches';
import GenerateTimetable from '../portals/admin/GenerateTimetable';
import ApprovalQueue from '../portals/admin/ApprovalQueue';

import TeacherDashboard from '../portals/teacher/TeacherDashboard';
import PreferencesForm from '../portals/teacher/PreferencesForm';
import MySchedule from '../portals/teacher/MySchedule';

import StudentDashboard from '../portals/student/StudentDashboard';
import ViewTimetable from '../portals/student/ViewTimetable';

function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
      <Route path="/admin/departments" element={<RequireRole role="admin"><ManageDepartments /></RequireRole>} />
      <Route path="/admin/faculty" element={<RequireRole role="admin"><ManageFaculty /></RequireRole>} />
      <Route path="/admin/rooms" element={<RequireRole role="admin"><ManageRooms /></RequireRole>} />
      <Route path="/admin/subjects" element={<RequireRole role="admin"><ManageSubjects /></RequireRole>} />
      <Route path="/admin/batches" element={<RequireRole role="admin"><ManageBatches /></RequireRole>} />
      <Route path="/admin/generate" element={<RequireRole role="admin"><GenerateTimetable /></RequireRole>} />
      <Route path="/admin/approvals" element={<RequireRole role="admin"><ApprovalQueue /></RequireRole>} />

      {/* Teacher */}
      <Route path="/teacher" element={<RequireRole role="teacher"><TeacherDashboard /></RequireRole>} />
      <Route path="/teacher/preferences" element={<RequireRole role="teacher"><PreferencesForm /></RequireRole>} />
      <Route path="/teacher/schedule" element={<RequireRole role="teacher"><MySchedule /></RequireRole>} />

      {/* Student */}
      <Route path="/student" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
      <Route path="/student/timetable" element={<RequireRole role="student"><ViewTimetable /></RequireRole>} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
