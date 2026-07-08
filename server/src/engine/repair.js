const { findFirstLegalSlot } = require('./greedySeed');

/**
 * Repair pass: after crossover/mutation, re-place any assignment that now
 * collides with another on room/faculty/batch for the same slot.
 */
function repair(assignments, context) {
  const occupied = { rooms: new Set(), faculty: new Set(), batches: new Set() };
  const repaired = [];

  for (const a of assignments) {
    const rKey = `${a.room}-${a.timeSlot}`;
    const fKey = `${a.faculty}-${a.timeSlot}`;
    const bKey = `${a.batch}-${a.timeSlot}`;

    const clash = occupied.rooms.has(rKey) || occupied.faculty.has(fKey) || occupied.batches.has(bKey);

    if (!clash) {
      occupied.rooms.add(rKey);
      occupied.faculty.add(fKey);
      occupied.batches.add(bKey);
      repaired.push(a);
      continue;
    }

    // find a new legal slot for this session, preserving its subject/faculty/batch
    const placement = findFirstLegalSlot(
      { batchId: a.batch, facultyId: a.faculty, isLab: false },
      context,
      occupied
    );
    if (placement) {
      const { room, slot } = placement;
      occupied.rooms.add(`${room.id}-${slot.id}`);
      occupied.faculty.add(`${a.faculty}-${slot.id}`);
      occupied.batches.add(`${a.batch}-${slot.id}`);
      repaired.push({ ...a, room: room.id, timeSlot: slot.id });
    } else {
      repaired.push(a); // no legal alternative found — leaves a hard violation for fitness to penalize
    }
  }

  return repaired;
}

module.exports = { repair };
