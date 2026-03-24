import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { SKILLS_DATA, defaultSkill } from '../data/skills';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Autonomous Navigation System",
      description: "A placeholder description for a robotics project focusing on mapping and path planning in dynamic environments.",
      skills: ["ROS2", "C++", "Python"]
    },
    {
      id: 2,
      title: "Machine Learning Pipeline",
      description: "A placeholder for a scalable ML pipeline that processes real-time sensor data and trains predictive models.",
      skills: ["AI/ML", "TensorFlow", "Python"]
    },
    {
      id: 3,
      title: "Embedded Control Interface",
      description: "A placeholder for an embedded systems project controlling hardware peripherals with strict real-time constraints.",
      skills: ["C", "Microcontrollers", "Hardware"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] } }
  };

  return (
    <div className="section-content projects-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h2 className="section-title">Featured Projects</h2>
        <div className="title-underline"></div>
      </motion.div>

      <motion.div 
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} className="project-card" variants={cardVariants} whileHover={{ y: -8 }}>
            <div className="project-card-header">
              <FolderGit2 className="project-icon" size={32} />
              <ExternalLink className="project-link" size={20} />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-skills">
              {project.skills.map((skillName, index) => {
                const skillInfo = SKILLS_DATA[skillName] || { ...defaultSkill, name: skillName };
                return (
                  <span 
                    key={index} 
                    className="skill-badge" 
                    style={{ 
                      color: skillInfo.color,
                      borderColor: `${skillInfo.color}40`,
                      backgroundColor: `${skillInfo.color}15`
                    }}
                  >
                    {React.cloneElement(skillInfo.icon, { size: 14, style: { marginRight: '6px' } })}
                    {skillInfo.name}
                  </span>
                );
              })}
            </div>

          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
