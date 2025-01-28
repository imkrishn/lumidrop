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
    return this.lives <= 0;
  }

  reset(): void {
    this.score = 0;
    this.lives = config.lives;
    this.streak = 0;
    this.newBest = false;
    this.bus.emit('scoreChanged', this.score);
    this.bus.emit('livesChanged', this.lives);
    this.bus.emit('comboChanged', this.multiplier);
  }

  collect(points: number): void {
    this.streak += 1;
    this.score += points * this.multiplier;
    this.bus.emit('scoreChanged', this.score);
    this.bus.emit('comboChanged', this.multiplier);
  }

  loseLife(): void {
    this.lives = Math.max(0, this.lives - 1);
    this.streak = 0;
    this.bus.emit('livesChanged', this.lives);
    this.bus.emit('comboChanged', this.multiplier);
  }

  finish(): void {
  }
}
