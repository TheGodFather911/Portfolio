/**
 * Hidden SVG filters used by the glass surfaces.
 *  - #glass-refraction: feTurbulence + feDisplacementMap warps whatever is
 *    behind the panel, producing the wavy "liquid glass" edge distortion.
 * Rendered once at the app root; referenced from CSS via backdrop-filter: url().
 */
export default function GlassFilters() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter id="glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.4" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="46"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="glass-refraction-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.014"
            numOctaves={2}
            seed={19}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.1" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
