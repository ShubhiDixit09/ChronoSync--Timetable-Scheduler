const { runGA } = require('../../src/engine/gaRunner');

describe('runGA', () => {
  it('produces hard-constraint-clean candidates when enough slots exist', () => {
    const context = {
      rooms: [{ id: 'r1', type: 'classroom' }, { id: 'r2', type: 'classroom' }],
      timeSlots: [{ id: 't1', day: 'Mon' }, { id: 't2', day: 'Mon' }, { id: 't3', day: 'Tue' }],
      timeSlotsById: {
        t1: { day: 'Mon' }, t2: { day: 'Mon' }, t3: { day: 'Tue' },
      },
      facultyPreferences: {},
    };
    const sessions = [
      { batchId: 'b1', subjectId: 'sub1', facultyId: 'f1', isLab: false },
      { batchId: 'b2', subjectId: 'sub2', facultyId: 'f2', isLab: false },
    ];
    const candidates = runGA(sessions, context, { POPULATION_SIZE: 10, MAX_GENERATIONS: 20 });
    expect(candidates[0].hard).toBe(0);
  });
});
