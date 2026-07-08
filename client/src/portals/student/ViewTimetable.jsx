import React, { useEffect, useState } from 'react';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import { getPublishedTimetable } from '../../api/timetableApi';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ViewTimetable() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    getPublishedTimetable(user.batch).then((tt) => setAssignments(tt.assignments));
  }, [user]);

  if (!assignments) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>My batch timetable</h2>
      <TimetableGrid assignments={assignments} />
    </div>
  );
}
