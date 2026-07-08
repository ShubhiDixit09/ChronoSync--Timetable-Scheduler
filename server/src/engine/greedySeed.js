/**
 * Greedy seeder — builds one legal-ish initial timetable.
 * Input: sessionsToSchedule = flat list of { batchId, subjectId, facultyId, durationSlots, isLab }
 *        context = { rooms, timeSlots, facultyLoadTracker }
 * Output: an array of Assignment-shaped objects (may still carry a small number
 *         of unresolved sessions if no legal slot exists — surfaced to the Admin UI).
 */

function findFirstLegalSlot(session, context, occupied) {
  const { rooms, timeSlots } = context;
  const eligibleRooms = rooms.filter((r) =>
    session.isLab ? r.type === 'lab' : true
  );

  for (const slot of timeSlots) {
    for (const room of eligibleRooms) {
      const key = `${slot.id}`;
      const roomBusy = occupied.rooms.has(`${room.id}-${slot.id}`);
      const facultyBusy = occupied.faculty.has(`${session.facultyId}-${slot.id}`);
      const batchBusy = occupied.batches.has(`${session.batchId}-${slot.id}`);

      if (!roomBusy && !facultyBusy && !batchBusy) {
        return { room, slot };
      }
    }
  }
  return null; // no legal slot found — caller decides how to handle
}

function greedySeed(sessionsToSchedule, context) {
  const assignments = [];
  const unresolved = [];
  const occupied = { rooms: new Set(), faculty: new Set(), batches: new Set() };

  for (const session of sessionsToSchedule) {
    const placement = findFirstLegalSlot(session, context, occupied);
    if (!placement) {
      unresolved.push(session);
      continue;
    }
    const { room, slot } = placement;
    occupied.rooms.add(`${room.id}-${slot.id}`);
    occupied.faculty.add(`${session.facultyId}-${slot.id}`);
    occupied.batches.add(`${session.batchId}-${slot.id}`);

    assignments.push({
      batch: session.batchId,
      subject: session.subjectId,
      faculty: session.facultyId,
      room: room.id,
      timeSlot: slot.id,
    });
  }

  return { assignments, unresolved };
}

module.exports = { greedySeed, findFirstLegalSlot };
