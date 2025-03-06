import type { Container } from 'pixi.js';
import type { EventBus } from './EventBus';
import type { GameEvents } from './events';
import type { StateMachine } from './StateMachine';
import type { Hero } from '../entities/Hero';
import type { Effects } from '../systems/Effects';
import type { InputSystem } from '../systems/InputSystem';
import type { ScoreSystem } from '../systems/ScoreSystem';
import type { Spawner } from '../systems/Spawner';

export type StateKey = 'menu' | 'play' | 'over';

export interface GameContext {
  bus: EventBus<GameEvents>;
  machine: StateMachine<StateKey>;
  score: ScoreSystem;
  input: InputSystem;
  spawner: Spawner;
  effects: Effects;
  hero: Hero;
  world: Container;
  ui: Container;
}
