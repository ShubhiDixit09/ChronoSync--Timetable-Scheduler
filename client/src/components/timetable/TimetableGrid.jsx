import React from 'react';

// assignments: [{ batch, subject, faculty, room, timeSlot: { day, period } }]
export default function TimetableGrid({ assignments, days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], periods = [1, 2, 3, 4, 5, 6] }) {
  const findAssignment = (day, period) =>
    assignments.find((a) => a.timeSlot?.day === day && a.timeSlot?.period === period);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th></th>
          {days.map((d) => (
            <th key={d} style={{ padding: 8, borderBottom: '1px solid #ddd' }}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {periods.map((p) => (
          <tr key={p}>
            <td style={{ padding: 8, fontWeight: 500 }}>Period {p}</td>
            {days.map((d) => {
              const a = findAssignment(d, p);
              return (
                <td key={d} style={{ padding: 8, border: '1px solid #eee', minWidth: 120 }}>
                  {a ? `${a.subject?.name || a.subject} — ${a.room?.name || a.room}` : ''}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
