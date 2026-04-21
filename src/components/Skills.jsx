import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA, SKILL_CATEGORIES, defaultSkill } from '../data/skills';

// -----------------------------------------------------------------------------
// SkillChip — compact pill with icon + name, glows in the skill's brand color.
// -----------------------------------------------------------------------------
const SkillChip = ({ skill }) => (
  <motion.div
    className="skill-chip"
    style={{
      color: skill.color,
      borderColor: `${skill.color}33`,
      backgroundColor: `${skill.color}10`,
    }}
    whileHover={{
      scale: 1.06,
      backgroundColor: `${skill.color}22`,
      borderColor: `${skill.color}99`,
      boxShadow: `0 8px 24px ${skill.color}33`,
    }}
    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    variants={{
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    }}
  >
    <span className="skill-chip-icon">
      {React.cloneElement(skill.icon, { size: 16 })}
    </span>
    <span className="skill-chip-name">{skill.name}</span>
  </motion.div>
);

// -----------------------------------------------------------------------------
// Skills section — one row per resume category, staggered reveal on scroll.
// -----------------------------------------------------------------------------
const Skills = () => {
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], staggerChildren: 0.04 },
    },
  };

  return (
    <div className="section-content skills-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h2 className="section-title">Technical Skills</h2>
        <div className="title-underline"></div>
        <p className="section-subtitle">
          End-to-end tooling across ML research, data engineering, software, and robotics.
        </p>
      </motion.div>

      <div className="skill-categories">
        {SKILL_CATEGORIES.map((category) => (
          <motion.div
            key={category.id}
            className="skill-category"
            variants={rowVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-80px' }}
          >
            <div className="skill-category-header">
              <span
                className="skill-category-dot"
                style={{ background: category.accent, boxShadow: `0 0 12px ${category.accent}99` }}
              />
              <h3 className="skill-category-label">{category.label}</h3>
              <span
                className="skill-category-rule"
                style={{
                  background: `linear-gradient(90deg, ${category.accent}80, transparent)`,
                }}
              />
            </div>

            <motion.div
              className="skill-chip-row"
              variants={{
                hidden: { opacity: 1 },
                show: { opacity: 1, transition: { staggerChildren: 0.04 } },
              }}
            >
              {category.items.map((name) => {
                const skill = SKILLS_DATA[name] || { ...defaultSkill, name };
                return <SkillChip key={name} skill={skill} />;
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
