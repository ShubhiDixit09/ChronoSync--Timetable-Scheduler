import React from 'react';
import ConflictBadge from './ConflictBadge';

export default function CandidateCard({ candidate, onApprove }) {
  return (
    <div className="card">
      <p>Fitness score: {candidate.fitnessScore}</p>
      <ConflictBadge count={candidate.hardViolations} />
      <div>
        <button onClick={() => onApprove(candidate._id)} disabled={candidate.hardViolations > 0}>
          Approve
        </button>
      </div>
    </div>
  );
}
