import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg from '../assets/Headshot-Caleb Collins.jpeg';

const ProfileBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="profile-badge-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -20, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <div className="profile-badge-header">
        <img src={heroImg} alt="Caleb Collins" className="profile-img" />
        <span className="profile-name">Caleb Collins</span>
      </div>

      <AnimatePresence>
        {isHovered && (
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
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="contact-badge-link" style={{ marginTop: '0.25rem', color: '#ffffff', fontWeight: 600 }}>View Resume 📄</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileBadge;
