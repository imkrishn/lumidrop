import { config } from '../config';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';

const BEST_KEY = 'glowfall.best';

export class ScoreSystem {
  score = 0;
  lives = config.lives;
  streak = 0;
  best = 0;
  newBest = false;

  constructor(private bus: EventBus<GameEvents>) {
    this.best = this.loadBest();
  }

  get multiplier(): number {
    return Math.min(1 + Math.floor(this.streak / 5), 4);
  }

  get dead(): boolean {
  }
}
