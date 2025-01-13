export const config = {
  width: 960,
  height: 600,
  background: 0x0b0d1a,
  floorY: 548,
  lives: 3,
  spineAsset: 'assets/spine/hero.json',
  anim: { idle: 'idle', move: 'run' },
  hero: {
    y: 520,
    speed: 540,
    padHeight: 84,
    spineScale: 0.2
  },
  orb: {
    radius: 16,
    minSpeed: 190,
    maxSpeed: 300
  },
  spawn: {
    start: 0.9,
    min: 0.3,
    ramp: 0.015
  }
};
