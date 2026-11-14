import { useEffect, useRef, useState } from 'react';

/**
 * Single-stroke neon letterforms (original, not based on any school or team
 * wordmark). Units are a 20x30 em-box; words are composed by advancing 23.
 */
const LETTERS = {
  A: 'M 1.6 29 L 10 1.8 L 18.4 29 M 5.4 18.6 H 14.6',
  B: 'M 3.2 29 V 1.8 H 11.2 C 17.2 1.8 17.2 14.2 11 15.2 C 17.6 16.2 17.8 29 11.2 29 H 3.2',
  C: 'M 17.6 7.6 C 15.6 1.8 3.2 1.8 3.2 15.4 C 3.2 29 15.6 29 17.6 23.2',
  E: 'M 17.2 1.8 H 3.2 V 29 H 17.2 M 3.2 15.4 H 14.4',
  G: 'M 17.6 7.6 C 15.6 1.8 3.2 1.8 3.2 15.4 C 3.2 29 16 29 18 21.6 V 16.4 H 11.2',
  H: 'M 3.2 1.8 V 29 M 16.8 1.8 V 29 M 3.2 15.4 H 16.8',
  I: 'M 6 1.8 H 14 M 10 1.8 V 29 M 6 29 H 14',
  J: 'M 4.2 1.8 H 16.6 M 11.4 1.8 V 21.4 C 11.4 29.4 2.2 29.4 2.2 21.8',
  K: 'M 3.2 1.8 V 29 M 17.6 1.8 L 7.2 15.4 L 17.6 29',
  L: 'M 3.2 1.8 V 29 H 17.2',
  M: 'M 1.8 29 V 1.8 L 10 16.6 L 18.2 1.8 V 29',
  N: 'M 3.2 29 V 1.8 L 16.8 29 V 1.8',
  O: 'M 10 1.8 C 3.4 1.8 1.8 8.2 1.8 15.4 C 1.8 22.6 3.4 29 10 29 C 16.6 29 18.2 22.6 18.2 15.4 C 18.2 8.2 16.6 1.8 10 1.8',
  P: 'M 3.2 29 V 1.8 H 11.6 C 17.8 1.8 17.8 16.2 11.6 16.2 H 3.2',
  R: 'M 3.2 29 V 1.8 H 11.6 C 17.6 1.8 17.6 14.8 11.6 14.8 H 3.2 M 10.8 14.8 L 17.6 29',
  S: 'M 16.8 8 C 16.2 2 3.4 1.8 3.4 8.4 C 3.4 14.2 16.8 14 16.8 21.2 C 16.8 28.4 3.2 28.6 3.2 22.4',
  T: 'M 1.6 1.8 H 18.4 M 10 1.8 V 29',
  U: 'M 3.2 1.8 V 19.6 C 3.2 29 16.8 29 16.8 19.6 V 1.8',
  V: 'M 1.6 1.8 L 10 29 L 18.4 1.8',
  Y: 'M 2 1.8 L 10 15.6 L 18 1.8 M 10 15.6 V 29',
  "'": 'M 8 2.2 L 5.6 9.2',
};

const ADVANCE = 23;

function NeonWord({
  word,
  x = 0,
  y = 0,
  scale = 1,
  color,
  highlight,
  bed = 'rgba(0,0,0,0.55)',
  bedWidth = 6.4,
  tubeWidth = 2.9,
  coreWidth = 1.1,
  italic = false,
}) {
  const chars = [...word];
  const skew = italic ? ' skewX(-10)' : '';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})${skew}`}>
      {chars.map((ch, i) => {
        const d = LETTERS[ch] || LETTERS[ch.toUpperCase()];
        if (!d) return null;
        return (
          <g
            key={`${ch}-${i}`}
            transform={`translate(${i * ADVANCE} 0)`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d} stroke={bed} strokeWidth={bedWidth} />
            <path d={d} stroke={color} strokeWidth={tubeWidth} />
            <path d={d} stroke={highlight} strokeWidth={coreWidth} />
          </g>
        );
      })}
    </g>
  );
}

function Tube({ d, color, highlight, bed = 'rgba(0,0,0,0.55)', bedWidth = 6, tubeWidth = 2.8, coreWidth = 1.1, fill = 'none' }) {
  return (
    <g fill={fill} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={bed} strokeWidth={bedWidth} fill="none" />
      <path d={d} stroke={color} strokeWidth={tubeWidth} fill="none" />
      <path d={d} stroke={highlight} strokeWidth={coreWidth} fill="none" />
    </g>
  );
}

function SignPin() {
  return (
    <span className="neon-pin" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="10" height="10">
        <circle cx="6" cy="6" r="4.2" fill="#2a2a2a" />
        <circle cx="6" cy="6" r="3.1" fill="url(#neon-pin-metal)" />
      </svg>
    </span>
  );
}

function Sign({ className, label, style, children, viewBox }) {
  return (
    <div className={`neon-sign ${className}`} role="img" aria-label={label} style={style}>
      <SignPin />
      <svg viewBox={viewBox} aria-hidden="true" focusable="false">
        {children}
      </svg>
    </div>
  );
}

const SIGNS = [
  {
    id: 'jmu',
    className: 'neon-sign-jmu',
    label: 'James Madison University, in purple and gold neon',
    viewBox: '-10 -10 96 58',
    draw: () => (
      <>
        <NeonWord word="JMU" x={0} y={0} color="#C084FC" highlight="#F3E8FF" bed="#1a0828" />
        <Tube
          d="M 4 38 H 64"
          color="#E8C36A"
          highlight="#FFF4CC"
          bed="#2a1c00"
          bedWidth="5"
          tubeWidth="2.6"
          coreWidth="1"
        />
      </>
    ),
  },
  {
    id: 'vikings',
    className: 'neon-sign-vikings',
    label: 'Minnesota Vikings, SKOL in purple neon with a gold horn',
    viewBox: '-8 -10 128 96',
    draw: () => (
      <>
        {/* Original curved drinking-horn, outlined in neon tubing */}
        <Tube
          d="M 16 16 C 4 22 6 48 24 50 C 58 54 92 26 118 2 C 94 20 64 40 28 30 C 16 26 14 18 16 16 Z"
          color="#FFD54A"
          highlight="#FFF3C2"
          bed="#2a1c00"
          bedWidth="5"
          tubeWidth="2.5"
          coreWidth="1"
        />
        <Tube
          d="M 58 24 L 66 42"
          color="#FFD54A"
          highlight="#FFF3C2"
          bed="#2a1c00"
          bedWidth="4.2"
          tubeWidth="2.2"
          coreWidth="0.9"
        />
        <NeonWord word="SKOL" x={10} y={58} scale={0.92} color="#C4B0FF" highlight="#F3E8FF" bed="#14081f" />
      </>
    ),
  },
  {
    id: 'vt',
    className: 'neon-sign-vt',
    label: 'Virginia Tech, in maroon and orange neon',
    viewBox: '-8 -8 204 78',
    draw: () => (
      <>
        <NeonWord word="VIRGINIA" x={0} y={0} scale={0.92} color="#FF6B8A" highlight="#FFD4DE" bed="#1a050c" />
        <Tube
          d="M 52 36 H 132"
          color="#FF9F43"
          highlight="#FFE0B0"
          bed="#2a1400"
          bedWidth="5"
          tubeWidth="2.5"
          coreWidth="1"
        />
        <NeonWord
          word="TECH"
          x={42}
          y={42}
          scale={0.92}
          color="#FF9F43"
          highlight="#FFE0B0"
          bed="#2a1400"
        />
      </>
    ),
  },
  {
    id: 'volley',
    className: 'neon-sign-volley',
    label: 'Volleyball, in white neon',
    viewBox: '-8 -8 116 128',
    draw: () => (
      <>
        <Tube
          d="M 50 8 C 27 8 8 27 8 50 C 8 73 27 92 50 92 C 73 92 92 73 92 50 C 92 27 73 8 50 8 Z"
          color="#FFF6D6"
          highlight="#FFFFFF"
          bed="#161410"
          bedWidth="5.5"
          tubeWidth="2.7"
          coreWidth="1.05"
        />
        <Tube
          d="M 50 10 C 62 28 38 72 50 90"
          color="#FFF6D6"
          highlight="#FFFFFF"
          bed="#161410"
          bedWidth="4.4"
          tubeWidth="2.3"
          coreWidth="0.95"
        />
        <Tube
          d="M 18 32 C 36 26 46 40 50 50 C 46 60 36 74 18 68"
          color="#FFF6D6"
          highlight="#FFFFFF"
          bed="#161410"
          bedWidth="4.4"
          tubeWidth="2.3"
          coreWidth="0.95"
        />
        <Tube
          d="M 82 32 C 64 26 54 40 50 50 C 54 60 64 74 82 68"
          color="#FFF6D6"
          highlight="#FFFFFF"
          bed="#161410"
          bedWidth="4.4"
          tubeWidth="2.3"
          coreWidth="0.95"
        />
        <NeonWord
          word="VOLLEYBALL"
          x={2}
          y={98}
          scale={0.48}
          color="#FFF6D6"
          highlight="#FFFFFF"
          bed="#161410"
          bedWidth="7"
          tubeWidth="3.2"
          coreWidth="1.2"
        />
      </>
    ),
  },
  {
    id: 'orioles',
    className: 'neon-sign-orioles',
    label: 'Baltimore Orioles, an original bird silhouette and script in orange neon',
    viewBox: '-8 -6 180 112',
    draw: () => (
      <>
        {/* Original perched songbird — not a team mascot */}
        <Tube
          d="M 90 16 C 79 16 79 38 90 38 C 101 38 101 16 90 16"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="4.8"
          tubeWidth="2.4"
          coreWidth="1"
        />
        <Tube
          d="M 93 26 C 91.4 26 91.4 29 93 29 C 94.6 29 94.6 26 93 26"
          color="#FFD7B3"
          highlight="#FFFFFF"
          bed="#1a0a00"
          bedWidth="3.2"
          tubeWidth="1.8"
          coreWidth="0.7"
        />
        <Tube
          d="M 100 24 L 116 28 L 100 32"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="4.4"
          tubeWidth="2.3"
          coreWidth="0.95"
        />
        <Tube
          d="M 78 30 C 60 22 40 26 32 34 C 24 42 30 58 50 60 C 68 62 82 50 84 38"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="5"
          tubeWidth="2.5"
          coreWidth="1"
        />
        <Tube
          d="M 54 32 C 64 24 78 26 84 38"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="4.2"
          tubeWidth="2.15"
          coreWidth="0.9"
        />
        <Tube
          d="M 32 34 C 20 30 10 26 4 22"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="4"
          tubeWidth="2.1"
          coreWidth="0.85"
        />
        <Tube
          d="M 32 38 C 18 40 10 44 4 50"
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
          bedWidth="4"
          tubeWidth="2.1"
          coreWidth="0.85"
        />
        <NeonWord
          word="ORIOLES"
          x={6}
          y={72}
          scale={0.86}
          italic
          color="#FF7A30"
          highlight="#FFD7B3"
          bed="#1a0a00"
        />
      </>
    ),
  },
  {
    id: 'chip',
    className: 'neon-sign-chip',
    label: 'Computer hardware, a neon CPU chip',
    viewBox: '-4 -4 128 132',
    draw: () => {
      const pins = [];
      const pinYs = [30, 42, 54, 66];
      const pinXs = [36, 52, 68, 84];
      pinYs.forEach((y) => {
        pins.push(`M 24 ${y} H 12`, `M 96 ${y} H 108`);
      });
      pinXs.forEach((x) => {
        pins.push(`M ${x} 18 V 6`, `M ${x} 78 V 90`);
      });
      return (
        <>
          <Tube
            d="M 24 18 H 96 V 78 H 24 Z"
            color="#22D3EE"
            highlight="#E0FDFF"
            bed="#041016"
            bedWidth="5"
            tubeWidth="2.5"
            coreWidth="1"
          />
          <Tube
            d="M 40 32 H 80 V 64 H 40 Z"
            color="#22D3EE"
            highlight="#E0FDFF"
            bed="#041016"
            bedWidth="4.2"
            tubeWidth="2.2"
            coreWidth="0.9"
          />
          <Tube
            d="M 32 23 C 27.5 23 27.5 29 32 29 C 36.5 29 36.5 23 32 23"
            color="#22D3EE"
            highlight="#E0FDFF"
            bed="#041016"
            bedWidth="3.6"
            tubeWidth="2"
            coreWidth="0.8"
          />
          {pins.map((d) => (
            <Tube
              key={d}
              d={d}
              color="#22D3EE"
              highlight="#E0FDFF"
              bed="#041016"
              bedWidth="3.8"
              tubeWidth="2"
              coreWidth="0.85"
            />
          ))}
          <NeonWord
            word="CPU"
            x={26}
            y={96}
            scale={0.86}
            color="#22D3EE"
            highlight="#E0FDFF"
            bed="#041016"
          />
        </>
      );
    },
  },
];

export default function NeonBoard() {
  const ref = useRef(null);
  const [lit, setLit] = useState(() => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  useEffect(() => {
    if (lit) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lit]);

  return (
    <aside
      ref={ref}
      className={`neon-board${lit ? ' is-lit' : ''}`}
      aria-label="Neon sign board of interests: James Madison University, Virginia Tech, the Minnesota Vikings, the Baltimore Orioles, volleyball, and computer hardware."
    >
      <div className="neon-board-glow" aria-hidden="true" />
      <svg className="neon-pin-defs" aria-hidden="true" width="0" height="0">
        <defs>
          <radialGradient id="neon-pin-metal" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f2f0ea" />
            <stop offset="45%" stopColor="#c5c1b5" />
            <stop offset="100%" stopColor="#6e6a62" />
          </radialGradient>
        </defs>
      </svg>
      <div className="neon-board-signs">
        {SIGNS.map((sign, index) => (
          <Sign
            key={sign.id}
            className={sign.className}
            label={sign.label}
            viewBox={sign.viewBox}
            style={{ '--ignite-delay': `${0.08 + index * 0.14}s` }}
          >
            {sign.draw()}
          </Sign>
        ))}
      </div>
    </aside>
  );
}

