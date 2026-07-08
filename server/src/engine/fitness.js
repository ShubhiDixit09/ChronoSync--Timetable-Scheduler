/**
 * Fitness function — lower penalty is better; a perfectly legal, fully-preferred
 * timetable approaches 0. Hard-constraint penalties are weighted far higher than soft.
 */

const HARD_PENALTY = 1000;

function countHardViolations(assignments) {
  const roomSlot = new Map();
  const facultySlot = new Map();
  const batchSlot = new Map();
  let violations = 0;

  for (const a of assignments) {
    const rKey = `${a.room}-${a.timeSlot}`;
    const fKey = `${a.faculty}-${a.timeSlot}`;
    const bKey = `${a.batch}-${a.timeSlot}`;

    if (roomSlot.has(rKey)) violations++;
    if (facultySlot.has(fKey)) violations++;
    if (batchSlot.has(bKey)) violations++;

    roomSlot.set(rKey, true);
    facultySlot.set(fKey, true);
    batchSlot.set(bKey, true);
  }
  return violations;
}

function countSoftViolations(assignments, context) {
  const { facultyPreferences = {} } = context;
  let penalty = 0;

  // Example soft rule: penalize sessions outside a faculty member's preferred slots
  for (const a of assignments) {
    const prefs = facultyPreferences[a.faculty];
    if (prefs && prefs.preferredSlotIds && prefs.preferredSlotIds.length > 0) {
      if (!prefs.preferredSlotIds.includes(a.timeSlot)) penalty += 1;
    }
  }

  // TODO: add workload-balance penalty, gap-minimization penalty, etc.
  return penalty;
}

function fitness(assignments, context) {
  const hard = countHardViolations(assignments);
  const soft = countSoftViolations(assignments, context);
  return { score: hard * HARD_PENALTY + soft, hard, soft };
}

module.exports = { fitness, countHardViolations, countSoftViolations };
