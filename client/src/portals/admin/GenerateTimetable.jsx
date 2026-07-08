import React, { useState } from 'react';
import { generateTimetable, getGenerationStatus } from '../../api/timetableApi';

export default function GenerateTimetable() {
  const [departmentId, setDepartmentId] = useState('');
  const [semester, setSemester] = useState('');
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);

  const handleGenerate = async () => {
    const { jobId } = await generateTimetable({ departmentId, semester: Number(semester) });
    setJobId(jobId);
    poll(jobId);
  };

  const poll = (id) => {
    const interval = setInterval(async () => {
      const result = await getGenerationStatus(id);
      setStatus(result.status);
      if (result.status === 'complete' || result.status === 'failed') clearInterval(interval);
    }, 2000);
  };

  return (
    <div className="page">
      <h2>Generate timetable</h2>
      <div className="card">
        <label>Department ID <input value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} /></label>
        <br />
        <label>Semester <input value={semester} onChange={(e) => setSemester(e.target.value)} /></label>
        <br />
        <button onClick={handleGenerate}>Generate</button>
      </div>
      {jobId && (
        <p>Job {jobId}: {status || 'starting...'} — check the Approval queue once complete.</p>
      )}
    </div>
  );
}
