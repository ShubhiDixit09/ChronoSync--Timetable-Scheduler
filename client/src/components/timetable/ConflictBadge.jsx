import React from 'react';

export default function ConflictBadge({ count }) {
  if (!count) return <span style={{ color: 'green' }}>No conflicts</span>;
  return <span style={{ color: 'crimson' }}>{count} conflict(s)</span>;
}
