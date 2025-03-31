import { config } from '../config';
import type { EventBus } from '../core/EventBus';
import type { GameEvents } from '../core/events';

const BEST_KEY = 'lumidrop.best';

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
    // +1 every 5 catches, capped at x4
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
    this.newBest = this.score > this.best;
    if (this.newBest) {
      this.best = this.score;
      this.saveBest();
    }
    this.bus.emit('runEnded', { score: this.score, best: this.best, newBest: this.newBest });
  }

  private loadBest(): number {
    try {
      return Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      return 0;
    }
  }

  private saveBest(): void {
    try {
      localStorage.setItem(BEST_KEY, String(this.best));
    } catch {
      // storage can be blocked, not a big deal
    }
  }
}
