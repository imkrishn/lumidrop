# lumidrop

a small arcade catcher built with pixi.js and typescript. you slide a little robot left and right, catch the falling light orbs, and dodge the bombs. it gets faster the longer you last.

i built it to practice the stack i want to work in: pixi.js, typescript, spine animation, webpack, and clean oop structure.

## run it

```
npm install
npm run dev
```

production build:

```
npm run build
```

controls: arrow keys or a / d, or press and drag on touch screens. enter or space starts a run.

## spine character

the hero is a spine skeleton loaded with pixi-spine. drop an export into `public/assets/spine/` as `hero.json`, `hero.atlas` and `hero.png`. animation names are set in `src/config.ts`. if the files are missing the game falls back to a drawn robot so it always runs.

the free spineboy example from esoteric software works fine for testing.

## how it is put together

```
src/
  core/       event bus, state machine, object pool, asset loading, game bootstrap
  entities/   hero, orb, backdrop
  systems/    input, score, spawner, effects
  states/     menu, play, game over
  ui/         button, hud, panel, text styles
```

| pattern | where | why |
| --- | --- | --- |
| state | `StateMachine`, `states/` | each screen owns its own enter / exit / update, no giant switch |
| observer | `EventBus` | score, hud and effects react to events without knowing each other |
| object pool | `ObjectPool`, `Spawner`, `Effects` | orbs and sparks get reused instead of allocated every spawn |
| dependency injection | `GameContext` | states get what they need from one object, easy to swap in tests |

some choices worth talking about:

- systems do one job each. `ScoreSystem` knows nothing about pixi, `Spawner` knows nothing about scoring.
- the event bus is typed, so emitting `orbCaught` with the wrong payload is a compile error.
- `Hero` hides whether it is a spine skeleton or a drawn doll. the rest of the game only calls `update` and `reset`.
- difficulty comes from two numbers in `config.ts` (spawn interval and fall speed), so tuning does not touch logic.

## things i would add next

- sound and a mute toggle
- unit tests for the pool, event bus and score multiplier
- a power up orb that widens the pad for a few seconds
