/** Tournament selection: pick the fittest of k random individuals. */
function tournamentSelect(population, scores, tournamentSize = 4) {
  let best = null;
  let bestScore = Infinity;
  for (let i = 0; i < tournamentSize; i++) {
    const idx = Math.floor(Math.random() * population.length);
    if (scores[idx] < bestScore) {
      bestScore = scores[idx];
      best = population[idx];
    }
  }
  return best;
}

module.exports = { tournamentSelect };
