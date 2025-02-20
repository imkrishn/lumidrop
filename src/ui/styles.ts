import { TextStyle } from 'pixi.js';

const family = '"Trebuchet MS", "Segoe UI", sans-serif';

export const styles = {
  title: new TextStyle({
    fontFamily: family,
    fontSize: 92,
    fontWeight: '900',
    letterSpacing: 4,
    fill: ['#7df9ff', '#c77dff'],
    stroke: '#0b0d1a',
    strokeThickness: 6,
    dropShadow: true,
  }
  )
}
