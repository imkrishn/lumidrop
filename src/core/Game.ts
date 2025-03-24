import { Application, Container } from 'pixi.js';
import { config } from '../config';
import { Backdrop } from '../entities/Backdrop';
import { Hero } from '../entities/Hero';
import { Effects } from '../systems/Effects';
import { InputSystem } from '../systems/InputSystem';
import { ScoreSystem } from '../systems/ScoreSystem';
import { Spawner } from '../systems/Spawner';
import { loadSkeleton } from './Assets';
import type { GameContext, StateKey } from './context';
import { EventBus } from './EventBus';
import type { GameEvents } from './events';
import { StateMachine } from './StateMachine';

export class Game {
  private app = new Application<HTMLCanvasElement>({
    width: config.width,
    height: config.height,
    backgroundColor: config.background,
    antialias: true,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2)
  });

  constructor(private host: HTMLElement) {}

  async start(): Promise<void> {
    const canvas = this.app.view;
    const skeleton = await loadSkeleton(config.spineAsset);

    this.host.querySelector('#boot')?.remove();
    this.host.appendChild(canvas);
    this.fit();
    window.addEventListener('resize', () => this.fit());

    const bus = new EventBus<GameEvents>();
    const world = new Container();
    const ui = new Container();
    const orbLayer = new Container();
    const fxLayer = new Container();
    const backdrop = new Backdrop();
    const hero = new Hero(skeleton);

    world.addChild(backdrop, orbLayer, hero, fxLayer);
    this.app.stage.addChild(world, ui);

    const machine = new StateMachine<StateKey>();
    const input = new InputSystem(canvas);
    const effects = new Effects(fxLayer, bus);

    const ctx: GameContext = {
      bus,
      machine,
      score: new ScoreSystem(bus),
      input,
      spawner: new Spawner(orbLayer),
      effects,
      hero,
      world,
    }
  }
}
