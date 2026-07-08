const { greedySeed } = require('../../src/engine/greedySeed');

describe('greedySeed', () => {
  const context = {
    rooms: [{ id: 'r1', type: 'classroom' }, { id: 'r2', type: 'lab' }],
    timeSlots: [{ id: 's1' }, { id: 's2' }],
  };

  it('places sessions into legal, non-conflicting slots', () => {
    const sessions = [
      { batchId: 'b1', subjectId: 'sub1', facultyId: 'f1', isLab: false },
      { batchId: 'b2', subjectId: 'sub2', facultyId: 'f2', isLab: false },
    ];
    const { assignments, unresolved } = greedySeed(sessions, context);
    expect(assignments.length).toBe(2);
    expect(unresolved.length).toBe(0);
  });

  it('leaves sessions unresolved when no legal slot remains', () => {
    const sessions = [
      { batchId: 'b1', subjectId: 'sub1', facultyId: 'f1', isLab: false },
      { batchId: 'b1', subjectId: 'sub2', facultyId: 'f1', isLab: false },
      { batchId: 'b1', subjectId: 'sub3', facultyId: 'f1', isLab: false }, // 3rd session, only 2 slots exist
    ];
    const { unresolved } = greedySeed(sessions, context);
    expect(unresolved.length).toBe(1);
  });
});
