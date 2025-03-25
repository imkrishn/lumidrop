import { Game } from './core/Game';

const host = document.getElementById('app');
if (host) {
  new Game(host).start();
}
