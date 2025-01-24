import type { OrbKind } from '../entities/Orb';

export type GameEvents = {
  scoreChanged: number;
  livesChanged: number;
  comboChanged: number;
  orbCaught: { x: number; y: number; kind: OrbKind };
  runEnded: { score: number; best: number; newBest: boolean };
};
