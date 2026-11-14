import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg from '../assets/headshot-badge.webp';

const canHoverFine = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const ProfileBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const handleMouseEnter = () => {
    if (canHoverFine()) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (canHoverFine()) setIsOpen(false);
  };

  const handleToggle = (event) => {
    if (event.target.closest('a')) return;
    if (!canHoverFine()) {
      setIsOpen((open) => !open);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((open) => !open);
    }
    if (event.key === 'Escape') setIsOpen(false);
  };

  return (
    <motion.div
      ref={rootRef}
      className={`profile-badge-container${isOpen ? ' is-open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -20, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <button
        type="button"
        className="profile-badge-header"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <img src={heroImg} alt="Caleb Collins" className="profile-img" width="44" height="44" />
        <span className="profile-name">Caleb Collins</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="profile-contact-info"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="contact-links-list">
              <a href="mailto:caleb.coll4@gmail.com" className="contact-badge-link">Email: caleb.coll4@gmail.com</a>
              <a href="https://linkedin.com/in/caleb-collins-5b85572b2" target="_blank" rel="noreferrer" className="contact-badge-link">LinkedIn Profile</a>
              <a href="https://github.com/calebcollins4" target="_blank" rel="noreferrer" className="contact-badge-link">GitHub Profile</a>
              <a href="/Caleb_Collins_Resume_For_Website.pdf" target="_blank" rel="noreferrer" className="contact-badge-link" style={{ marginTop: '0.25rem', color: '#ffffff', fontWeight: 600 }}>View Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileBadge;
