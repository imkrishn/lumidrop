import { Application } from 'pixi.js';
import { config } from '../config';
import { loadSkeleton } from './Assets';

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
  }
}
