import { config } from '../config';

const BEST_KEY = 'glowfall.best';

export class ScoreSystem {
  score = 0;
  lives = config.lives;
  streak = 0;
  best = 0;
  newBest = false;
}
