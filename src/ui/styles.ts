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
    dropShadowColor: '#7df9ff',
    dropShadowBlur: 24,
    dropShadowDistance: 0,
    dropShadowAlpha: 0.55
  }),
  heading: new TextStyle({
    fontFamily: family,
    fontSize: 40,
    fontWeight: '800',
    fill: '#ffffff'
  }),
  subtitle: new TextStyle({
    fontFamily: family,
    fontSize: 22,
    fill: '#a9b4e8'
  }),
  hint: new TextStyle({
    fontFamily: family,
    fontSize: 16,
    fill: '#6f7bb0'
  }),
  button: new TextStyle({
    fontFamily: family,
    fontSize: 24,
    fontWeight: '700',
    fill: '#7df9ff'
  }),
  score: new TextStyle({
    fontFamily: family,
    fontSize: 44,
    fontWeight: '800',
    fill: '#ffffff',
    dropShadow: true,
    dropShadowColor: '#7df9ff',
    dropShadowBlur: 10,
    dropShadowDistance: 0,
    dropShadowAlpha: 0.5
  }),
  small: new TextStyle({
    fontFamily: family,
  }
  )
}
