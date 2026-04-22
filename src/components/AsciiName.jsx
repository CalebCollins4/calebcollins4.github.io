import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const textMask = [
  "          ████████   ███████   ███       ███████  ████████         ",
  "         █████████  █████████  ███       ███████  █████████        ",
  "         ███        ███   ███  ███       ███      ███   ██         ",
  "         ███        █████████  ███       ██████   ███████          ",
  "         ███        ███   ███  ███       ███      ███   ██         ",
  "         █████████  ███   ███  ████████  ███████  █████████        ",
  "          ████████  ███   ███  ████████  ███████  ████████         ",
  "                                                                   ",
  "  ███████   ██████   ███       ███       ███   ███    ██   ███████ ",
  " ████████  ████████  ███       ███       ███   ████   ██   ███████ ",
  " ██        ██    ██  ███       ███       ███   ████   ██   ██      ",
  " ██        ██    ██  ███       ███       ███   ██ ██  ██   ███████ ",
  " ██        ██    ██  ███       ███       ███   ██  ██ ██        ██ ",
  " ████████  ████████  ████████  ████████  ███   ██   ████   ███████ ",
  "  ███████   ██████   ████████  ████████  ███   ██    ███   ███████ "
];

// hex
const chars = "0123456789abcdef"
// binary
// const chars = "01"

const update_ms = 100

const InteractiveChar = ({ isSpace }) => {
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

  return (
    <motion.span
      onMouseEnter={() => {
        setIsHovered(true);
        setChar(chars[Math.floor(Math.random() * chars.length)]);
      }}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered ? '#ffffff' : '#b0b0b0',
        scale: isHovered ? 1.4 : 1,
        textShadow: isHovered
          ? '0px 0px 10px rgba(255,255,255,0.9)'
          : '0 0 8px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.9)',
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
            lineHeight: '1.1'
          }}
        >
          {line.split('').map((char, charIndex) => (
            <InteractiveChar key={`${lineIndex}-${charIndex}`} isSpace={char === ' '} />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default AsciiName;
