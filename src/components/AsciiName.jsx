import React, { useState, useEffect } from 'react';
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
// binary
// const chars = "01"

const update_ms = 100

const InteractiveChar = ({ isSpace, layer = 'core' }) => {
  const [char, setChar] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isSpace) return;

    // Initial assignment
    setChar(chars[Math.floor(Math.random() * chars.length)]);

    // Random glitch effect occasionally
    const interval = setInterval(() => {
      // 3% chance to change character every 100ms
      if (Math.random() > 0.9) {
        setChar(chars[Math.floor(Math.random() * chars.length)]);
      }
    }, update_ms);

    return () => clearInterval(interval);
  }, [isSpace]);

  if (isSpace) {
    return <span style={{ display: 'inline-block', width: '1ch' }}>&nbsp;</span>;
  }

  const layerColor = layer === 'highlight' ? '#e8e8e8' : layer === 'shadow' ? '#6e6e6e' : '#b0b0b0';
  const layerOpacity = layer === 'shadow' ? 0.7 : 1;
  const layerShadow = layer === 'shadow'
    ? '0 0 4px rgba(0,0,0,0.6)'
    : '0 0 8px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.9)';

  return (
    <motion.span
      onMouseEnter={() => {
        setIsHovered(true);
        setChar(chars[Math.floor(Math.random() * chars.length)]);
      }}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered ? '#ffffff' : layerColor,
        scale: isHovered ? 1.4 : 1,
        opacity: isHovered ? 1 : layerOpacity,
        textShadow: isHovered
          ? '0px 0px 10px rgba(255,255,255,0.9)'
          : layerShadow,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '1ch',
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'default',
        userSelect: 'none'
      }}
    >
      {char}
    </motion.span>
  );
};

const AsciiName = ({ variants }) => {
  return (
    <motion.div
      className="name-title-ascii"
      variants={variants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Courier New', Courier, monospace", // Ensure standard monospace width
      }}
    >
      {textMask.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="ascii-line"
          style={{
            display: 'flex',
            justifyContent: 'center',
            lineHeight: '1.05'
          }}
        >
          {line.split('').map((char, charIndex) => (
            <InteractiveChar
              key={`${lineIndex}-${charIndex}`}
              isSpace={char === ' '}
              layer={char === '+' ? 'highlight' : char === '.' ? 'shadow' : 'core'}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default AsciiName;
