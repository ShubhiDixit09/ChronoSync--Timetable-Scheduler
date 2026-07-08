const { greedySeed } = require('./greedySeed');
const { fitness } = require('./fitness');
const { tournamentSelect } = require('./selection');
const { crossover } = require('./crossover');
const { mutate } = require('./mutation');
const { repair } = require('./repair');
const { GA_DEFAULTS } = require('../config/constants');

/**
 * Runs the hybrid Greedy + GA pipeline.
 * @param {Array} sessionsToSchedule - flat list of sessions needing placement
 * @param {Object} context - { rooms, timeSlots, timeSlotsById, facultyPreferences }
 * @param {Object} [options] - override GA_DEFAULTS
 * @returns {Array} top-K candidate timetables, each { assignments, score, hard, soft }
 */
function runGA(sessionsToSchedule, context, options = {}) {
  const opts = { ...GA_DEFAULTS, ...options };

  // 1. Greedy-seed the initial population
  let population = [];
  for (let i = 0; i < opts.POPULATION_SIZE; i++) {
    const { assignments } = greedySeed(sessionsToSchedule, context);
    population.push(assignments);
  }

  let best = [];

  for (let gen = 0; gen < opts.MAX_GENERATIONS; gen++) {
    const scored = population.map((individual) => ({
      individual,
      ...fitness(individual, context),
    }));
    scored.sort((a, b) => a.score - b.score);

    best = scored.slice(0, opts.CANDIDATES_TO_RETURN);

    // Early stop if top candidate is hard-constraint-clean and near-optimal
    if (best[0].hard === 0 && best[0].soft === 0) break;

    const nextGen = scored.slice(0, opts.ELITE_COUNT).map((s) => s.individual); // elitism

    const scores = scored.map((s) => s.score);
    const rawPopulation = scored.map((s) => s.individual);

    while (nextGen.length < opts.POPULATION_SIZE) {
      const parentA = tournamentSelect(rawPopulation, scores, opts.TOURNAMENT_SIZE);
      const parentB = tournamentSelect(rawPopulation, scores, opts.TOURNAMENT_SIZE);
      let child = crossover(parentA, parentB, context.timeSlotsById);
      child = mutate(child, context.rooms, context.timeSlots, opts.MUTATION_RATE);
      child = repair(child, context);
      nextGen.push(child);
    }

    population = nextGen;
  }

  return best.map((b) => ({ assignments: b.individual, score: b.score, hard: b.hard, soft: b.soft }));
}

module.exports = { runGA };
