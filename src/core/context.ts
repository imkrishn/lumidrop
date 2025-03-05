import type { EventBus } from './EventBus';
import type { GameEvents } from './events';
import type { StateMachine } from './StateMachine';

export type StateKey = 'menu' | 'play' | 'over';

export interface GameContext {
  bus: EventBus<GameEvents>;
  machine: StateMachine<StateKey>;
}
