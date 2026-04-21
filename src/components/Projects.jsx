import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FolderGit2, ArrowUpRight, Lock, Github } from 'lucide-react';
import { SKILLS_DATA, defaultSkill } from '../data/skills';
import { PROJECTS } from '../data/projects';
import ProjectModal from './ProjectModal';

// -----------------------------------------------------------------------------
// 3D tilt card — rotates subtly with the cursor for an immersive-but-calm feel.
// -----------------------------------------------------------------------------
const ProjectCard = ({ project, onOpen }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Glow follows the cursor inside the card.
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x} ${y}, ${project.accent}22, transparent 60%)`,
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const previewTech = project.technologies.slice(0, 4);
  const extraTechCount = Math.max(0, project.technologies.length - previewTech.length);

  const hasGithub = !!project.links?.github;
  const isPrivate = !!project.links?.private;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      ref={cardRef}
      className="project-card-v2"
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Open details for ${project.title}`}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] } },
      }}
      whileHover={{ y: -6 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        '--accent': project.accent,
      }}
    >
      <motion.span
        className="project-card-glow"
        aria-hidden="true"
        style={{ background: glowBackground }}
      />

      <span
        className="project-accent-strip"
        style={{ background: `linear-gradient(180deg, ${project.accent}, ${project.accent}44)` }}
      />

      <div className="project-card-header">
        <div className="project-icon-wrap" style={{ color: project.accent }}>
          <FolderGit2 size={28} />
        </div>

        {hasGithub && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="project-repo-link"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${project.title} GitHub repository`}
          >
            <Github size={18} />
          </a>
        )}
        {isPrivate && (
          <span
            className="project-repo-link private"
            title="Private repository"
            onClick={(e) => e.stopPropagation()}
          >
            <Lock size={16} />
          </span>
        )}
      </div>

      <div className="project-category-tag" style={{ color: project.accent }}>
        {project.category}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-tagline">{project.tagline}</p>

      <div className="project-skills">
        {previewTech.map((skillName) => {
          const skillInfo = SKILLS_DATA[skillName] || { ...defaultSkill, name: skillName };
          return (
            <span
              key={skillName}
              className="skill-badge"
              style={{
                color: skillInfo.color,
                borderColor: `${skillInfo.color}40`,
                backgroundColor: `${skillInfo.color}15`,
              }}
            >
              {React.cloneElement(skillInfo.icon, { size: 14, style: { marginRight: '6px' } })}
              {skillInfo.name}
            </span>
          );
        })}
        {extraTechCount > 0 && (
          <span className="skill-badge skill-badge-more">+{extraTechCount} more</span>
        )}
      </div>

      <div className="project-expand-hint">
        <span>View details</span>
        <ArrowUpRight size={16} />
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// Projects section
// -----------------------------------------------------------------------------
const Projects = () => {
  const [selected, setSelected] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="section-content projects-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h2 className="section-title">Featured Projects</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">
          End-to-end work in agentic AI, recommender systems, and autonomous robotics. Click a card for the full build.
        </p>
      </motion.div>

      <motion.div
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-100px' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelected} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
