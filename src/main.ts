import { Game } from './core/Game';

const host = document.getElementById('app');
// only start if the mount point exists
if (host) {
  new Game(host).start();
}
