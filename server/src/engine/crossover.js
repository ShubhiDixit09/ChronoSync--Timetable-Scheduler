/**
 * Day-wise crossover: split each parent's assignments by day, alternate which
 * parent contributes each day's schedule to the child.
 */
function crossover(parentA, parentB, timeSlotsById) {
  const child = [];
  const byDay = (assignments) => {
    const grouped = {};
    for (const a of assignments) {
      const day = timeSlotsById[a.timeSlot]?.day || 'unknown';
      grouped[day] = grouped[day] || [];
      grouped[day].push(a);
    }
    return grouped;
  };

  const daysA = byDay(parentA);
  const daysB = byDay(parentB);
  const allDays = new Set([...Object.keys(daysA), ...Object.keys(daysB)]);

  let toggle = true;
  for (const day of allDays) {
    const source = toggle ? daysA[day] : daysB[day];
    if (source) child.push(...source);
    toggle = !toggle;
  }

  return child;
}

module.exports = { crossover };
