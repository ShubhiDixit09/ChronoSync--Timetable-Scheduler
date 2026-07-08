import React, { useEffect, useState } from 'react';
import CandidateCard from '../../components/timetable/CandidateCard';
import { getCandidates, approveTimetable } from '../../api/timetableApi';

// NOTE: in practice this page needs the jobId passed in (e.g. via route state or query param)
export default function ApprovalQueue({ jobId }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (jobId) getCandidates(jobId).then(setCandidates);
  }, [jobId]);

  const handleApprove = async (id) => {
    await approveTimetable(id);
    if (jobId) getCandidates(jobId).then(setCandidates);
  };

  return (
    <div className="page">
      <h2>Candidate timetables</h2>
      {candidates.length === 0 && <p>No candidates yet — generate a timetable first.</p>}
      {candidates.map((c) => (
        <CandidateCard key={c._id} candidate={c} onApprove={handleApprove} />
      ))}
    </div>
  );
}
