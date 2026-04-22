// -----------------------------------------------------------------------------
// Project data — hand-lifted from resume/Caleb_Collins_Resume_Brief.tex.
// Each record powers both the card preview in Projects.jsx and the expanded
// ProjectModal.jsx view.  Tech strings must match keys in data/skills.jsx.
// -----------------------------------------------------------------------------

export const PROJECTS = [
  {
    id: 'thought-cascade',
    title: 'Thought Cascade',
    subtitle: 'Iterative Code-Repair Agent',
    category: 'Machine Learning / Developer Tools',
    tagline:
      'A command-line agent that repairs broken Python functions by reasoning about failing tests, proposing a fix, running it, and iterating until the suite passes.',
    description:
      'A pluggable code-repair tool that wraps a language model in a reason-act-observe loop. Each iteration generates a plan, turns it into a structured candidate fix, runs the fix against the test suite in a sandboxed executor, and feeds the concrete failure (compilation error, first failing input vs. expected output, or pass rate) back into the next attempt. It ships with two interchangeable model backends: a hosted OpenAI-compatible fast path for production, and a HuggingFace Transformers path for on-device or air-gapped runs. A built-in QuixBugs benchmark harness quantifies the lift over single-shot prompting.',
    highlights: [
      'Built a sandboxed execution harness that surfaces rich feedback (compile errors, first failing input, aggregate pass rate) so each iteration has something concrete to learn from.',
      'Ships with two drop-in model backends: a hosted OpenAI-compatible endpoint for production latency and a local HuggingFace path for offline deployment, selected with a single env var.',
      'Tolerant output parser salvages malformed JSON and bare code from lossy small-model responses so the loop keeps making progress when format instructions are ignored.',
      'Built-in benchmark command runs the agent and a single-shot baseline across QuixBugs and reports pass@1 and average pass rate side-by-side.',
    ],
    metrics: [
      { value: '2', label: 'Pluggable backends' },
      { value: 'QuixBugs', label: 'Benchmark harness' },
      { value: 'CLI + API', label: 'Ways to run it' },
    ],
    technologies: [
      'Python',
      'PyTorch',
      'Hugging Face',
      'LLM Agents',
      'Transformers',
      'Local LLM Inference',
      'Test-Driven Development',
    ],
    links: {
      github: 'https://github.com/CalebCollins4/thought-cascade',
    },
    accent: '#EE4C2C',
  },
  {
    id: 'music-recommender',
    title: 'Music Recommender',
    subtitle: 'Audio-Feature Similarity Engine for 340k+ Tracks',
    category: 'Machine Learning / Recommender Systems',
    tagline:
      'A Flask service that returns songs similar to a seed track, or to a custom sound profile, over a 340,000-track Spotify-derived catalog.',
    description:
      'A music-discovery service built around a k-Nearest Neighbors similarity engine over Spotify-style audio features (energy, danceability, valence, tempo, and friends). Users search a 340,000-track catalog, pick a seed song or build a sound profile from sliders, and get neighbors ranked by cosine, Euclidean, or Manhattan distance. It ships with two interchangeable recommender backends: a from-scratch reference implementation, and a vectorized sklearn / NumPy production path. The frontend is a single-page web client with iTunes album art and YouTube audio previews.',
    highlights: [
      'Two interchangeable k-NN backends behind the same interface: a from-scratch reference implementation and a vectorized sklearn / NumPy production path that serves a 340k-track catalog in single-digit milliseconds per query.',
      'Supports three distance metrics (cosine, Euclidean, Manhattan) and lets users restrict similarity to any subset of audio features on the fly.',
      'Feature pipeline handles outlier detection, median imputation, and standard scaling so large-scale features like tempo do not dominate distance computations.',
      'Single-page client with live search, iTunes album-art lookup, and YouTube audio previews via yt-dlp, all wired to a small Flask REST API.',
    ],
    metrics: [
      { value: '340k+', label: 'Tracks served' },
      { value: '3', label: 'Distance metrics' },
      { value: '~100x', label: 'Fast vs. scratch speedup' },
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'k-NN & Recommenders',
      'Feature Engineering',
      'Feature Scaling',
      'RESTful APIs',
    ],
    links: {
      github: 'https://github.com/CalebCollins4/music-recommender',
    },
    accent: '#1DB954',
  },
  {
    id: 'patient-finder',
    title: 'Patient Finder',
    subtitle: 'TurtleBot Autonomous Navigation with ArUco + LiDAR',
    category: 'Robotics / Autonomous Systems',
    tagline:
      'A ROS2 finite-state controller that explores a simulated environment, locates ArUco-tagged patients, and photographs them.',
    description:
      'A TurtleBot autonomous navigation stack that locates patients tagged with ArUco fiducial markers in a simulated environment. LiDAR range data and a monocular camera stream feed into obstacle avoidance and visual target localization, all coordinated by a finite-state ROS2 controller that steps through exploration, target acquisition, approach, and photograph phases. Built as a group project; the repository is private.',
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
      privateNote: 'Group class project. Repository is private.',
    },
    accent: '#22314E',
    course: 'James Madison University, Autonomous Robotics',
  },
];
