import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';

const GithubIcon = ({ size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GithubIcon size={32} />,
      url: 'https://github.com/CalebCollins4',
      external: true,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon size={32} />,
      url: 'https://www.linkedin.com/in/caleb-collins-5b85572b2',
      external: true,
    },
    {
      name: 'Email',
      icon: <Mail size={32} />,
      url: 'mailto:caleb.coll4@gmail.com',
      external: false,
    },
    {
      name: 'Resume',
      icon: <FileText size={32} />,
      url: '/Caleb_Collins_Resume_Brief.pdf',
      external: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="section-content contact-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="section-header"
        style={{ alignItems: 'center', marginBottom: '4rem' }}
      >
        <h2 className="section-title">Let's Connect</h2>
        <div className="title-underline"></div>
      </motion.div>

      <motion.div
        className="contact-links"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-100px' }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="contact-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="contact-icon">{link.icon}</div>
            <span className="contact-name">{link.name}</span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Contact;
