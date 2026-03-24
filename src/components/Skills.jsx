import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../data/skills';

const Skills = () => {
  const skillsList = [
    SKILLS_DATA["Python"],
    SKILLS_DATA["ROS2"],
    SKILLS_DATA["AI/ML"]
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="section-content skills-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h2 className="section-title">Core Skills</h2>
        <div className="title-underline"></div>
      </motion.div>

      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
      >
        {skillsList.map((skill, index) => (
          <motion.div 
            key={index} 
            className="skill-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: `0px 10px 30px ${skill.color}50`,
              borderColor: `${skill.color}80`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="skill-icon" style={{ color: skill.color }}>
              {React.cloneElement(skill.icon, { size: 48 })}
            </div>
            <h3 className="skill-name">{skill.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
