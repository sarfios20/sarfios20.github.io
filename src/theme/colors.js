/**
 * Single source of truth for the site's color system.
 *
 * Two seed colors (accent + neutral) expand into full weight scales using
 * fixed lightness ladders, so contrast stays correct for any hue. The build
 * uses this to emit the default scales (BaseLayout injects them as :root
 * vars), and the visitor color picker re-runs the same recipe at runtime
 * (ladders are passed to the inline script via define:vars).
 *
 * Semantic tokens in global.css map these scales to roles (--bg, --fg,
 * --accent...) per theme; components only ever use semantic tokens.
 */

export const DEFAULT_ACCENT = '#4f46e5';
export const DEFAULT_NEUTRAL = '#808080';

// Weight scales and their fixed lightness ladders (HSL lightness, %).
export const ACCENT_WEIGHTS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export const ACCENT_LIGHTNESS = [96, 93, 88, 80, 72, 62, 52, 44, 37, 31];
export const NEUTRAL_WEIGHTS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const NEUTRAL_LIGHTNESS = [98, 95.5, 90, 81.5, 65.5, 45, 32, 23.5, 15.5, 9.5, 5.5];

// Saturation handling. Accent keeps the picked saturation (clamped).
// Neutrals scale the picked saturation per weight: strong at the light end
// (a cream background needs high saturation to read as cream at 98%
// lightness) and gentle in the mid/dark range so text stays comfortable.
export const ACCENT_SAT_MIN = 25;
export const ACCENT_SAT_MAX = 95;
export const NEUTRAL_SAT_MAX = 70;
export const NEUTRAL_SAT_FACTOR = [1, 0.9, 0.7, 0.5, 0.3, 0.25, 0.25, 0.25, 0.3, 0.35, 0.4];

// At 98% lightness no tint is visible, so saturation pulls the light end
// down a little: no tint = near-white, full tint = real cream (~95.5%).
export const NEUTRAL_TINT_DROP = [2.5, 2.5, 2, 1.5, 0, 0, 0, 0, 0, 0, 0];

export function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100];
}

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}

/** Expand seed colors into the CSS var map. Either seed may be null. */
export function colorScales(accentHex, neutralHex) {
  const vars = {};
  if (accentHex) {
    const [h, s] = hexToHsl(accentHex);
    const sat = Math.min(Math.max(s, ACCENT_SAT_MIN), ACCENT_SAT_MAX);
    ACCENT_WEIGHTS.forEach((w, i) => {
      vars[`--accent-${w}`] = hslToHex(h, sat, ACCENT_LIGHTNESS[i]);
    });
  }
  if (neutralHex) {
    const [h, s] = hexToHsl(neutralHex);
    const sat = Math.min(s, NEUTRAL_SAT_MAX);
    const satRatio = sat / NEUTRAL_SAT_MAX;
    NEUTRAL_WEIGHTS.forEach((w, i) => {
      const lightness = NEUTRAL_LIGHTNESS[i] - NEUTRAL_TINT_DROP[i] * satRatio;
      vars[`--neutral-${w}`] = hslToHex(h, sat * NEUTRAL_SAT_FACTOR[i], lightness);
    });
  }
  return vars;
}
