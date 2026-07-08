const { fitness, countHardViolations } = require('../../src/engine/fitness');

describe('fitness', () => {
  it('detects a room double-booking as a hard violation', () => {
    const assignments = [
      { batch: 'b1', subject: 's1', faculty: 'f1', room: 'r1', timeSlot: 't1' },
      { batch: 'b2', subject: 's2', faculty: 'f2', room: 'r1', timeSlot: 't1' }, // same room+slot
    ];
    expect(countHardViolations(assignments)).toBe(1);
  });

  it('scores a clean, fully-preferred timetable near zero', () => {
    const assignments = [
      { batch: 'b1', subject: 's1', faculty: 'f1', room: 'r1', timeSlot: 't1' },
    ];
    const context = { facultyPreferences: {} };
    const result = fitness(assignments, context);
    expect(result.hard).toBe(0);
    expect(result.score).toBe(0);
  });
});
