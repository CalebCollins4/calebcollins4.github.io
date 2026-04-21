import React from 'react';
import {
  Code,
  Cpu,
  Database,
  BrainCircuit,
  Globe,
  Layers,
  Bot,
  Eye,
  MessageSquare,
  GitBranch,
  Workflow,
  LineChart,
  BarChart3,
  Radar,
  Radio,
  FileText,
  FlaskConical,
  Box,
  Terminal,
  Network,
  Hash,
  Binary,
  Sparkles,
  Target,
  Shuffle,
  TrendingUp,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCheck,
  GitPullRequest,
  Rocket,
  Wrench,
  Notebook,
  Cloud,
  MonitorPlay,
  FolderTree,
  Car,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Branded SVG logos
// ---------------------------------------------------------------------------

export const PythonLogo = ({ size = 24, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 110 110"
    width={size}
    height={size}
    style={style}
    className="python-logo"
  >
    <path fill="#387EB8" d="M53.8,11.3C28.2,11.3,24,23.3,24,23.3V36h29.5v4.2H19.9c0,0-13.6-1.5-13.6,14.6 c0,16.2,11.9,15.6,11.9,15.6h6.7V57.6c0-10.4,8.9-10.4,8.9-10.4h19c9,0,8.9-8.4,8.9-8.4V24C81.4,12.7,53.8,11.3,53.8,11.3z M39.3,20 c2.4,0,4.3,2,4.3,4.4s-1.9,4.4-4.3,4.4s-4.3-2-4.3-4.4S36.9,20,39.3,20z" />
    <path fill="#FFE052" d="M55.8,98.7c25.6,0,29.8-11.9,29.8-11.9V74H56.1v-4.2h33.6c0,0,13.6,1.5,13.6-14.6 c0-16.2-11.9-15.6-11.9-15.6h-6.7v12.8c0,10.4-8.9,10.4-8.9,10.4h-19c-9,0-8.9,8.4-8.9,8.4v14.4C28.2,97.3,55.8,98.7,55.8,98.7z M70.3,90c-2.4,0-4.3-2-4.3-4.4c0-2.4,1.9-4.4,4.3-4.4s4.3,2,4.3,4.4C74.6,88,72.7,90,70.3,90z" />
  </svg>
);

export const PyTorchLogo = ({ size = 24, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={style}
    fill="#EE4C2C"
  >
    <path d="M18.25 5.25l-1.06 1.06a7.5 7.5 0 1 1-10.38 0L4.75 4.25a10 10 0 1 0 13.5 1zM14.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

export const HuggingFaceLogo = ({ size = 24, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={size}
    height={size}
    style={style}
  >
    <circle cx="20" cy="20" r="18" fill="#FFD21E" />
    <circle cx="14" cy="18" r="2" fill="#3A3A3A" />
    <circle cx="26" cy="18" r="2" fill="#3A3A3A" />
    <path d="M12 24c2 3 5 5 8 5s6-2 8-5" stroke="#3A3A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M8 22c-2 0-3 1.5-3 3s1 2 2 2" stroke="#FF9D00" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M32 22c2 0 3 1.5 3 3s-1 2-2 2" stroke="#FF9D00" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Skill dictionary — every resume skill keyed by its display name.
// Shape: { name, icon, color }.  Projects.jsx and Skills.jsx both read from here.
// ---------------------------------------------------------------------------

export const defaultSkill = { name: 'Skill', icon: <Code />, color: '#888888' };

export const SKILLS_DATA = {
  // Programming Languages
  Python: { name: 'Python', icon: <PythonLogo />, color: '#4B8BBE' },
  C: { name: 'C', icon: <Code />, color: '#A8B9CC' },
  Java: { name: 'Java', icon: <Code />, color: '#F89820' },
  SQL: { name: 'SQL', icon: <Database />, color: '#00758F' },
  R: { name: 'R', icon: <LineChart />, color: '#276DC3' },

  // Machine Learning & Deep Learning
  PyTorch: { name: 'PyTorch', icon: <PyTorchLogo />, color: '#EE4C2C' },
  TensorFlow: { name: 'TensorFlow', icon: <Layers />, color: '#FF6F00' },
  Keras: { name: 'Keras', icon: <Layers />, color: '#D00000' },
  'Scikit-learn': { name: 'Scikit-learn', icon: <FlaskConical />, color: '#F7931E' },
  'Hugging Face': { name: 'Hugging Face', icon: <HuggingFaceLogo />, color: '#FFD21E' },
  XGBoost: { name: 'XGBoost', icon: <BarChart3 />, color: '#00A98F' },

  // AI Specializations
  'Deep Learning': { name: 'Deep Learning', icon: <BrainCircuit />, color: '#8B5CF6' },
  'Reinforcement Learning': { name: 'Reinforcement Learning', icon: <Target />, color: '#F43F5E' },
  'Computer Vision': { name: 'Computer Vision', icon: <Eye />, color: '#10B981' },
  NLP: { name: 'NLP', icon: <MessageSquare />, color: '#06B6D4' },
  'LLM Agents': { name: 'LLM Agents', icon: <Bot />, color: '#FFD21E' },
  'Agentic AI (ReAct)': { name: 'Agentic AI (ReAct)', icon: <Workflow />, color: '#F97316' },
  Transformers: { name: 'Transformers', icon: <Sparkles />, color: '#A855F7' },
  'RNN/LSTM': { name: 'RNN/LSTM', icon: <Network />, color: '#3B82F6' },
  CNN: { name: 'CNN', icon: <Layers />, color: '#EC4899' },
  'Ensemble Methods': { name: 'Ensemble Methods', icon: <Shuffle />, color: '#14B8A6' },
  'k-NN & Recommenders': { name: 'k-NN & Recommenders', icon: <Radar />, color: '#1DB954' },

  // Data Engineering & Analysis
  Pandas: { name: 'Pandas', icon: <Database />, color: '#150458' },
  NumPy: { name: 'NumPy', icon: <Hash />, color: '#4DABCF' },
  'Feature Engineering': { name: 'Feature Engineering', icon: <SlidersHorizontal />, color: '#8B5CF6' },
  'Feature Scaling': { name: 'Feature Scaling', icon: <TrendingUp />, color: '#0EA5E9' },
  'Outlier Detection': { name: 'Outlier Detection', icon: <Filter />, color: '#F59E0B' },
  'Cross-Validation': { name: 'Cross-Validation', icon: <CheckCheck />, color: '#22C55E' },
  'Hyperparameter Tuning': { name: 'Hyperparameter Tuning', icon: <SlidersHorizontal />, color: '#EAB308' },
  'ETL Pipelines': { name: 'ETL Pipelines', icon: <Workflow />, color: '#6366F1' },
  Matplotlib: { name: 'Matplotlib', icon: <LineChart />, color: '#11557C' },
  Seaborn: { name: 'Seaborn', icon: <BarChart3 />, color: '#4C7FBE' },

  // Software Engineering
  'Git/GitHub': { name: 'Git/GitHub', icon: <GitBranch />, color: '#F05032' },
  'RESTful APIs': { name: 'RESTful APIs', icon: <Globe />, color: '#3B82F6' },
  'Agile/Scrum': { name: 'Agile/Scrum', icon: <GitPullRequest />, color: '#0052CC' },
  'Test-Driven Development': { name: 'Test-Driven Development', icon: <CheckCheck />, color: '#22C55E' },
  'CI/CD': { name: 'CI/CD', icon: <Rocket />, color: '#2088FF' },

  // Robotics & Embedded
  ROS2: { name: 'ROS2', icon: <Cpu />, color: '#22314E' },
  LiDAR: { name: 'LiDAR', icon: <Radio />, color: '#00B4D8' },
  'ArUco Marker Detection': { name: 'ArUco Markers', icon: <Search />, color: '#F97316' },
  Kinematics: { name: 'Kinematics', icon: <Wrench />, color: '#64748B' },
  'Autonomous Navigation': { name: 'Autonomous Navigation', icon: <Car />, color: '#10B981' },

  // Tools & Environments
  Jupyter: { name: 'Jupyter', icon: <Notebook />, color: '#F37626' },
  'Google Colab': { name: 'Google Colab', icon: <Cloud />, color: '#F9AB00' },
  'VS Code': { name: 'VS Code', icon: <MonitorPlay />, color: '#007ACC' },
  Anaconda: { name: 'Anaconda', icon: <FolderTree />, color: '#44A833' },
  'Local LLM Inference': { name: 'Local LLM Inference', icon: <Terminal />, color: '#A855F7' },

  // Back-compat aliases (used by legacy placeholders / older badges)
  'AI/ML': { name: 'AI/ML', icon: <BrainCircuit />, color: '#FF6F00' },
  'C++': { name: 'C++', icon: <Code />, color: '#00599C' },
  Microcontrollers: { name: 'Microcontrollers', icon: <Cpu />, color: '#4CAF50' },
  Hardware: { name: 'Hardware', icon: <Box />, color: '#795548' },
};

// ---------------------------------------------------------------------------
// Category groupings — mirrors the resume's Technical Skills section.
// Skills.jsx renders one row per category.
// ---------------------------------------------------------------------------

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    label: 'Programming Languages',
    accent: '#4B8BBE',
    items: ['Python', 'C', 'Java', 'SQL', 'R'],
  },
  {
    id: 'ml',
    label: 'Machine Learning & Deep Learning',
    accent: '#EE4C2C',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'Hugging Face', 'XGBoost'],
  },
  {
    id: 'ai',
    label: 'AI Specializations',
    accent: '#A855F7',
    items: [
      'Deep Learning',
      'Reinforcement Learning',
      'Computer Vision',
      'NLP',
      'LLM Agents',
      'Agentic AI (ReAct)',
      'Transformers',
      'RNN/LSTM',
      'CNN',
      'Ensemble Methods',
      'k-NN & Recommenders',
    ],
  },
  {
    id: 'data',
    label: 'Data Engineering & Analysis',
    accent: '#0EA5E9',
    items: [
      'Pandas',
      'NumPy',
      'Feature Engineering',
      'Feature Scaling',
      'Outlier Detection',
      'Cross-Validation',
      'Hyperparameter Tuning',
      'ETL Pipelines',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    id: 'software',
    label: 'Software Engineering',
    accent: '#22C55E',
    items: ['Git/GitHub', 'RESTful APIs', 'Agile/Scrum', 'Test-Driven Development', 'CI/CD'],
  },
  {
    id: 'robotics',
    label: 'Robotics & Embedded',
    accent: '#10B981',
    items: ['ROS2', 'LiDAR', 'ArUco Marker Detection', 'Kinematics', 'Autonomous Navigation'],
  },
  {
    id: 'tools',
    label: 'Tools & Environments',
    accent: '#F37626',
    items: ['Jupyter', 'Google Colab', 'VS Code', 'Anaconda', 'Local LLM Inference'],
  },
];
