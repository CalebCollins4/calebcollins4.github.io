import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

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
      url: '/Caleb_Collins_Resume_For_Website.pdf',
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
