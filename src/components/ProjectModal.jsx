import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Lock, CheckCircle2, ArrowUpRight, GraduationCap } from 'lucide-react';
import { SKILLS_DATA, defaultSkill } from '../data/skills';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2 } },
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const { links = {} } = project;

  return (
    <motion.div
      className="project-modal-backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        className="project-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
        style={{ '--accent': project.accent }}
      >
        <div
          className="project-modal-accent"
          style={{
            background: `linear-gradient(90deg, ${project.accent} 0%, ${project.accent}66 60%, transparent 100%)`,
          }}
        />

        <button className="project-modal-close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        <div className="project-modal-header">
          <div className="project-modal-category-row">
            <span className="project-modal-category" style={{ color: project.accent }}>
              {project.category}
            </span>
            {project.course && (
              <span className="project-modal-course">
                <GraduationCap size={14} />
                {project.course}
              </span>
            )}
          </div>

          <h2 id={`modal-title-${project.id}`} className="project-modal-title">
            {project.title}
          </h2>
          <p className="project-modal-subtitle">{project.subtitle}</p>
          <p className="project-modal-tagline">{project.tagline}</p>
        </div>

        <div className="project-modal-body">
          <section className="project-modal-section">
            <h3 className="project-modal-section-title">Overview</h3>
            <p className="project-modal-text">{project.description}</p>
          </section>

          {project.metrics?.length > 0 && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">At a glance</h3>
              <div className="project-metric-row">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="project-metric-tile"
                    style={{ borderColor: `${project.accent}55` }}
                  >
                    <div className="project-metric-value" style={{ color: project.accent }}>
                      {m.value}
                    </div>
                    <div className="project-metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.highlights?.length > 0 && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Key highlights</h3>
              <ul className="project-highlight-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="project-highlight-item">
                    <CheckCircle2 size={18} style={{ color: project.accent, flexShrink: 0 }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.technologies?.length > 0 && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Tech stack</h3>
              <div className="project-modal-tech">
                {project.technologies.map((name) => {
                  const s = SKILLS_DATA[name] || { ...defaultSkill, name };
                  return (
                    <span
                      key={name}
                      className="skill-badge"
                      style={{
                        color: s.color,
                        borderColor: `${s.color}50`,
                        backgroundColor: `${s.color}18`,
                      }}
                    >
                      {React.cloneElement(s.icon, { size: 14, style: { marginRight: '6px' } })}
                      {s.name}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          <section className="project-modal-section">
            <h3 className="project-modal-section-title">Links</h3>
            <div className="project-link-row">
              {links.github && (
                <a
                  className="project-link-btn"
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    borderColor: `${project.accent}60`,
                    color: '#ffffff',
                  }}
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
              {links.private && (
                <span
                  className="project-link-btn project-link-btn-disabled"
                  title={links.privateNote || 'Private repository'}
                >
                  <Lock size={16} />
                  <span>{links.privateNote || 'Private repository'}</span>
                </span>
              )}
              {links.paper && (
                <a className="project-link-btn" href={links.paper} target="_blank" rel="noreferrer">
                  <span>Read paper</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
              {links.demo && (
                <a className="project-link-btn" href={links.demo} target="_blank" rel="noreferrer">
                  <span>Live demo</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
