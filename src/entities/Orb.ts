export type OrbKind = 'gold' | 'cyan' | 'bomb';

export const orbKinds: Record<OrbKind, { color: number; points: number }> = {
  gold: { color: 0xffd166, points: 10 },
  cyan: { color: 0x7df9ff, points: 5 },
}
