import { Application, Container } from 'pixi.js';
import { config } from '../config';
import { Backdrop } from '../entities/Backdrop';
import { loadSkeleton } from './Assets';
import { EventBus } from './EventBus';
import type { GameEvents } from './events';

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
  }
}
