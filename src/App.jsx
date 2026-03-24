import { motion, useScroll, useTransform } from "framer-motion";
import Chatbot from "./components/Chatbot";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import NeuralNetworkBackground from "./components/NeuralNetworkBackground";
import FlashlightNetwork from "./components/FlashlightNetwork";
import Contact from "./components/Contact";
import AsciiName from "./components/AsciiName";
import About from "./components/About";
import ProfileBadge from "./components/ProfileBadge";
import "./App.css";

function App() {
  const { scrollY } = useScroll();
  
  // Fade out both background and home content over the first 400px of vertical scroll
  const fadeOutOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Fade IN the interactive flashlight network as the home section fades out
  const fadeInOpacity = useTransform(scrollY, [300, 500], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time delay between each child animating
      },
    },
  };

  // Removed the y movement so the text stays completely still during entrance
  const itemVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0], 
      }
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <ProfileBadge />

      {/* Home Page Neural Network */}
      <motion.div 
        style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 0, 
          pointerEvents: 'none',
          opacity: fadeOutOpacity 
        }}
      >
        <NeuralNetworkBackground />
      </motion.div>

      {/* Flashlight Neural Network for the rest of the site */}
      <motion.div 
        style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 0, 
          pointerEvents: 'none',
          opacity: fadeInOpacity 
        }}
      >
        <FlashlightNetwork />
      </motion.div>

      <motion.nav 
        className="nav-menu"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <a className="nav-link" onClick={() => scrollToSection('home-top')}>Home</a>
        <a className="nav-link" onClick={() => scrollToSection('about')}>About</a>
        <a className="nav-link" onClick={() => scrollToSection('projects')}>Projects</a>
        <a className="nav-link" onClick={() => scrollToSection('skills')}>Skills</a>
        <a className="nav-link" onClick={() => scrollToSection('ai-chat')}>Ask AI</a>
        <a className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
      </motion.nav>

      <div id="home-top" style={{ position: 'absolute', top: 0 }}></div>

      {/* Coverpage Section Wrapper to allow scrolling padding while the content stays sticky */}
      <div style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 1 }}>
        <motion.section 
          id="home"
          className="cover-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeOutOpacity,
          }}
        >
          <AsciiName variants={itemVariants} />
          
          <motion.h2 className="role-subtitle" variants={itemVariants}>
            Computer Engineer
          </motion.h2>
        </motion.section>
      </div>

      <div className="content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {/* About Section */}
        <motion.section 
          id="about"
          className="page-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <About />
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          className="page-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <Projects />
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills"
          className="page-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Skills />
        </motion.section>

        {/* Chatbot Section */}
        <motion.section 
          id="ai-chat"
          className="page-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <Chatbot />
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact"
          className="page-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{ minHeight: '60vh' }}
        >
          <Contact />
        </motion.section>
      </div>
    </div>
  );
}

export default App;
