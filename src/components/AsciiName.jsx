import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

// 14-row block letters (~18 cols including a 1-cell SE shadow), with
// three density layers: '+' highlight, '#' core, '.' shadow. Spaces are empty.
// Not a 2x pixel-scale of the original 7x9 font — curves, counters, and a
// shadow layer were redrawn at the higher resolution.
const textMask = [
  "                    +++++++++             +++++         +++                  ++++++++++++++++    +++++++++++++                    ",
  "                  ++#########++          +#####+        +##.                 +###############.   +############++                  ",
  "                 +####.....+###+        +##...+#+       +##.                 +##..............   +##.........+##.                 ",
  "                 +###..     .+#..      +##..   +#+      +##.                 +##.                +##.         +#+                 ",
  "                 +##..        ..      +##..     +#+     +##.                 +##.                +##.         +##.                ",
  "                +##..                 +##.      +##.    +##.                 +##.                +##.        +##..                ",
  "                +##.                 +##..       +#+    +##.                 +##++++++++++       +##+++++++++#...                 ",
  "                +##.                 +##+++++++++###.   +##.                 +############.      +############.                   ",
  "                +##.                 +##############.   +##.                 +##...........      +##.........+++                  ",
  "                 +#+                +##...........+#+   +##.                 +##.                +##.         +#+                 ",
  "                 +##+        ++     +##.          +##.  +##.                 +##.                +##.         +##.                ",
  "                 +###+     ++##+    +##.          +##.  +##.                 +##.                +##.        +##..                ",
  "                  +###+++++####..   +##.          +##.   +#++++++++++++++    +##+++++++++++++    +##+++++++++###.                 ",
  "                   .+########...    +##.          +##.   +###############.   +###############.   +############...                 ",
  "                                                                                                                                  ",
  "    +++++++++            +++++++        +++                 +++                 +++++++++   +++           +++      +++++++++++    ",
  "  ++#########++        ++#######++      +##.                +##.                +########.  +##+          +##.   ++###########++  ",
  " +####.....+###+      +###.....+##+     +##.                +##.                 ..+##....  +###+         +##.   +###.......+###. ",
  " +###..     .+#..    +##...     .+#+    +##.                +##.                   +##.     +##.+++       +##.   +##..       .... ",
  " +##..        ..    +##..         +#+   +##.                +##.                   +##.     +##. +#+      +##.   +##.             ",
  "+##..               +##.          +##.  +##.                +##.                   +##.     +##.  +#+     +##.   +##+             ",
  "+##.                +##.          +##.  +##.                +##.                   +##.     +##.   +#+    +##.    +##++++++++++   ",
  "+##.                +##.          +##.  +##.                +##.                   +##.     +##.    +#+   +##.     .+##########+  ",
  "+##.                +##.          +##.  +##.                +##.                   +##.     +##.     +#+  +##.       ........+##. ",
  " +#+                +##.          +##.  +##.                +##.                   +##.     +##.      +#+ +##.               +##. ",
  " +##+        ++      +#+         +##..  +##.                +##.                   +##.     +##.       +#+##..   +++         +##. ",
  " +###+     ++##+      +#++     ++##..   +##.                +##.                   +##.     +##.        +###.    +##+       +###. ",
  "  +###+++++####..      +##+++++###..     +#++++++++++++++    +#++++++++++++++   +++###+++   +##.         +##.    +###+++++++####. ",
  "   .+########...        .+######...      +###############.   +###############.  +########.  +##.          +#+     .+##########... "
]

// hex
const chars = "0123456789abcdef"
const CHAR_COUNT = chars.length
const UPDATE_MS = 100

const layerClass = (maskChar) => {
  if (maskChar === '+') return 'highlight'
  if (maskChar === '.') return 'shadow'
  return 'core'
}

const AsciiName = ({ variants }) => {
  const rootRef = useRef(null)

  // Stable random starting glyphs for this mount, so the first paint
  // already looks like the animated field.
  const initialGrid = useMemo(
    () =>
      textMask.map((line) =>
        line.split('').map((maskChar) =>
          maskChar === ' ' ? ' ' : chars[Math.floor(Math.random() * CHAR_COUNT)],
        ),
      ),
    [],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll('[data-ascii-glyph]')

    // One interval for the whole name, instead of a timer per glyph.
    const interval = setInterval(() => {
      nodes.forEach((el) => {
        // Same cadence as before: ~10% of glyphs tick every 100ms.
        if (Math.random() > 0.9) {
          el.textContent = chars[Math.floor(Math.random() * CHAR_COUNT)]
        }
      })
    }, UPDATE_MS)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={rootRef}
      className="name-title-ascii"
      variants={variants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {textMask.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="ascii-line"
          style={{
            display: 'flex',
            justifyContent: 'center',
            lineHeight: '1.05',
          }}
        >
          {line.split('').map((maskChar, charIndex) =>
            maskChar === ' ' ? (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="ascii-space"
                aria-hidden="true"
              >
                &nbsp;
              </span>
            ) : (
              <span
                key={`${lineIndex}-${charIndex}`}
                className={`ascii-glyph ascii-glyph-${layerClass(maskChar)}`}
                data-ascii-glyph="1"
                onMouseEnter={(e) => {
                  e.currentTarget.textContent =
                    chars[Math.floor(Math.random() * CHAR_COUNT)]
                }}
              >
                {initialGrid[lineIndex][charIndex]}
              </span>
            ),
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default AsciiName
