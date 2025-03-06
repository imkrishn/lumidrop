import { Container } from 'pixi.js';
import type { State } from '../core/StateMachine';

export class MenuState implements State {
  private root = new Container();
}
