module.exports = {
  ROLES: {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
  },
  TIMETABLE_STATUS: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending-approval',
    PUBLISHED: 'published',
    REJECTED: 'rejected',
  },
  ROOM_TYPES: {
    CLASSROOM: 'classroom',
    LAB: 'lab',
  },
  SUBJECT_TYPES: {
    LECTURE: 'lecture',
    LAB: 'lab',
  },
  // GA tuning defaults — override via env or admin settings later
  GA_DEFAULTS: {
    POPULATION_SIZE: 60,
    MAX_GENERATIONS: 300,
    MUTATION_RATE: 0.08,
    TOURNAMENT_SIZE: 4,
    ELITE_COUNT: 4,
    CANDIDATES_TO_RETURN: 5,
  },
};
