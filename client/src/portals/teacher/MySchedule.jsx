import React, { useEffect, useState } from 'react';
import TimetableGrid from '../../components/timetable/TimetableGrid';
import { getPublishedTimetable } from '../../api/timetableApi';
import { useAuth } from '../../hooks/useAuth';

export default function MySchedule() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getPublishedTimetable().then((tt) => {
      const mine = tt.assignments.filter((a) => a.faculty === user.faculty);
      setAssignments(mine);
    });
  }, [user]);

  return (
    <div className="page">
      <h2>My schedule</h2>
      <TimetableGrid assignments={assignments} />
    </div>
  );
}
