import type { EventBus } from './EventBus';
import type { GameEvents } from './events';
import type { StateMachine } from './StateMachine';
import type { InputSystem } from '../systems/InputSystem';
import type { ScoreSystem } from '../systems/ScoreSystem';

export type StateKey = 'menu' | 'play' | 'over';

export interface GameContext {
  bus: EventBus<GameEvents>;
  machine: StateMachine<StateKey>;
  score: ScoreSystem;
  input: InputSystem;
}
