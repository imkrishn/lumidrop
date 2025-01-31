import { Assets } from 'pixi.js';
import type { ISkeletonData } from 'pixi-spine';

export async function loadSkeleton(url: string): Promise<ISkeletonData | null> {
  try {
    const res = await Assets.load(url);
    return (res?.spineData as ISkeletonData) ?? null;
  } catch {
  }
}
