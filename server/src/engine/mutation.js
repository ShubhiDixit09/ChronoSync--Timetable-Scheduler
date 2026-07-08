/**
 * Mutation: with probability `rate`, reassign a random session to a different
 * (room, timeSlot) pair. Legality is NOT guaranteed after mutation — the repair
 * step handles that.
 */
function mutate(assignments, rooms, timeSlots, rate = 0.08) {
  return assignments.map((a) => {
    if (Math.random() > rate) return a;
    const newRoom = rooms[Math.floor(Math.random() * rooms.length)];
    const newSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    return { ...a, room: newRoom.id, timeSlot: newSlot.id };
  });
}

module.exports = { mutate };
