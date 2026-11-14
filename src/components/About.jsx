import NeonBoard from './NeonBoard';

const About = () => {
  return (
    <div className="section-content about-content">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>
      <div className="about-layout">
        <div className="about-text-container">
          <p className="about-text">
            I am a passionate Computer Engineer specializing in AI and Machine Learning, with a deep
            appreciation for minimalist design and intuitive user experiences. My work bridges
            the gap between complex technical problem-solving and elegant, human-centric interfaces.
          </p>
          <p className="about-text" style={{ marginTop: '1.5rem' }}>
            I studied Computer Science at James Madison University, and I am now a Machine Learning
            Engineer Intern at Volvo Group while pursuing a master's in computer engineering at
            Virginia Tech. I am deeply involved in learning about all aspects of computing and am
            always looking for the latest innovations in Artificial Intelligence, Machine Learning,
            Computer Hardware, and Quantum Computing.
          </p>
        </div>

        <NeonBoard />
      </div>
    </div>
  );
};

export default About;
