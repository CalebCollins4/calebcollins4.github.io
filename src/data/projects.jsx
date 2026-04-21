// -----------------------------------------------------------------------------
// Project data — hand-lifted from resume/Caleb_Collins_Resume_Brief.tex.
// Each record powers both the card preview in Projects.jsx and the expanded
// ProjectModal.jsx view.  Tech strings must match keys in data/skills.jsx.
// -----------------------------------------------------------------------------

export const PROJECTS = [
  {
    id: 'react-agent',
    title: 'Agentic AI System',
    subtitle: 'ReAct Architecture for Iterative Code Debugging',
    category: 'AI / LLM Agents',
    tagline:
      'Reasoning + Acting + Observing loops that let small local LLMs self-correct their way past single-shot prompting.',
    description:
      'An end-to-end agentic AI system implementing the ReAct (Reasoning, Acting, Observing) pattern from Yao et al. (2022) for iterative code debugging. The agent generates thoughts, parses structured actions, observes the environment, and carries a history-aware prompt across iterations — enabling genuine self-correction rather than one-shot guesses.',
    highlights: [
      'Engineered the full ReAct loop: thought generation, structured action parsing, environment observation, and history-aware prompting across iterations.',
      'Integrated and benchmarked four small LLMs locally — Gemma-2 2B, Qwen-2.5 3B, Llama-3.2 3B, and SmolLM 360M — via Hugging Face Transformers, analyzing trade-offs between model size, latency, and agentic success rate.',
      'Evaluated on the QuixBugs benchmark with pass@K metrics plus adversarial and property-based oracle tests, demonstrating iterative ReAct loops materially outperform single-shot prompting without scaling the underlying model.',
      'Showed that inference-time reasoning structure is a cheaper lever than raw parameter count for debugging-style tasks.',
    ],
    metrics: [
      { value: '4', label: 'Local LLMs benchmarked' },
      { value: 'QuixBugs', label: 'Evaluation suite' },
      { value: 'ReAct', label: 'Reasoning pattern' },
    ],
    technologies: [
      'Python',
      'PyTorch',
      'Hugging Face',
      'LLM Agents',
      'Agentic AI (ReAct)',
      'Transformers',
      'Local LLM Inference',
    ],
    links: {
      github:
        'https://github.com/CalebCollins4/VirginiaTech/tree/main/ECE5424%20-%20Advanced%20Machine%20Learning/Project%203%20Thought%20Cascade',
    },
    accent: '#EE4C2C',
    course: 'Virginia Tech — ECE 5424 Advanced Machine Learning',
  },
  {
    id: 'knn-music',
    title: 'Music Recommender',
    subtitle: 'k-Nearest Neighbors on a 339,801-track Spotify Dataset',
    category: 'ML / Recommender Systems',
    tagline:
      'Hand-built k-NN over audio features with principled feature scaling, paired with a web app and YouTube previews.',
    description:
      'A from-scratch k-Nearest Neighbors recommender trained on a 339,801-track Spotify audio-features dataset. The feature pipeline performs outlier detection, log-transformation of right-skewed features, and Yeo-Johnson normalization to materially improve distance-based similarity quality. The model is exposed through a Python adapter layer to a web application with YouTube Data API previews, closing the loop from raw audio features to a listen-and-discover UX.',
    highlights: [
      'Implemented k-Nearest Neighbors from scratch over 339,801 Spotify tracks — no black-box sklearn model for the core similarity step.',
      'Built a feature pipeline with outlier detection, log-transformation of right-skewed features, and Yeo-Johnson normalization for distance-quality gains.',
      'Compared Euclidean, Cosine, and Manhattan distance metrics to understand trade-offs in taste-similarity geometry.',
      'Integrated the model into a web app via a Python adapter layer with YouTube Data API audio previews.',
    ],
    metrics: [
      { value: '339,801', label: 'Tracks in dataset' },
      { value: '3', label: 'Distance metrics compared' },
      { value: 'Yeo-Johnson', label: 'Normalization applied' },
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'k-NN & Recommenders',
      'Feature Engineering',
      'Feature Scaling',
      'Outlier Detection',
      'RESTful APIs',
    ],
    links: {
      github:
        'https://github.com/CalebCollins4/VirginiaTech/tree/main/ECE5424%20-%20Advanced%20Machine%20Learning/Project%201%20KNN%20Music%20Recommender',
    },
    accent: '#1DB954',
    course: 'Virginia Tech — ECE 5424 Advanced Machine Learning',
  },
  {
    id: 'patient-finder',
    title: 'Patient Finder',
    subtitle: 'TurtleBot Autonomous Navigation with ArUco + LiDAR',
    category: 'Robotics / Autonomous Systems',
    tagline:
      'A ROS2 finite-state controller that explores a simulated environment, locates ArUco-tagged patients, and photographs them.',
    description:
      'A TurtleBot autonomous navigation stack that locates patients tagged with ArUco fiducial markers in a simulated environment. LiDAR range data and a monocular camera stream feed into obstacle avoidance and visual target localization, all coordinated by a finite-state ROS2 controller that steps through exploration, target acquisition, approach, and photograph phases. Built as a group project — repository is private.',
    highlights: [
      'TurtleBot stack locating patients tagged with ArUco fiducial markers in a simulated environment.',
      'Fused LiDAR range data with a monocular camera stream for obstacle avoidance and visual target localization.',
      'Finite-state ROS2 controller orchestrating Exploration -> Acquisition -> Approach -> Photograph.',
      'Integrated perception, control, and navigation layers inside a single ROS2 workspace.',
    ],
    metrics: [
      { value: 'ROS2', label: 'Middleware' },
      { value: 'FSM', label: 'Controller design' },
      { value: 'LiDAR + Cam', label: 'Sensor fusion' },
    ],
    technologies: [
      'Python',
      'ROS2',
      'LiDAR',
      'ArUco Marker Detection',
      'Computer Vision',
      'Autonomous Navigation',
      'Kinematics',
    ],
    links: {
      private: true,
      privateNote: 'Group class project — repository is private.',
    },
    accent: '#22314E',
    course: 'James Madison University — Autonomous Robotics',
  },
];
