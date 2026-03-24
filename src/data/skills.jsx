import React from 'react';
import { Cpu, BrainCircuit, Code, Database, Globe } from 'lucide-react';

// Official Python Logo SVG wrapper
export const PythonLogo = ({ size = 24, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 110 110" 
    width={size} 
    height={size}
    style={style}
    className="python-logo"
  >
    <path fill="#387EB8" d="M53.8,11.3C28.2,11.3,24,23.3,24,23.3V36h29.5v4.2H19.9c0,0-13.6-1.5-13.6,14.6 c0,16.2,11.9,15.6,11.9,15.6h6.7V57.6c0-10.4,8.9-10.4,8.9-10.4h19c9,0,8.9-8.4,8.9-8.4V24C81.4,12.7,53.8,11.3,53.8,11.3z M39.3,20 c2.4,0,4.3,2,4.3,4.4s-1.9,4.4-4.3,4.4s-4.3-2-4.3-4.4S36.9,20,39.3,20z"/>
    <path fill="#FFE052" d="M55.8,98.7c25.6,0,29.8-11.9,29.8-11.9V74H56.1v-4.2h33.6c0,0,13.6,1.5,13.6-14.6 c0-16.2-11.9-15.6-11.9-15.6h-6.7v12.8c0,10.4-8.9,10.4-8.9,10.4h-19c-9,0-8.9,8.4-8.9,8.4v14.4C28.2,97.3,55.8,98.7,55.8,98.7z M70.3,90c-2.4,0-4.3-2-4.3-4.4c0-2.4,1.9-4.4,4.3-4.4s4.3,2,4.3,4.4C74.6,88,72.7,90,70.3,90z"/>
  </svg>
);

export const defaultSkill = { name: "Skill", icon: <Code />, color: "#888888" };

export const SKILLS_DATA = {
  "Python": { name: "Python", icon: <PythonLogo />, color: "#4B8BBE" }, 
  "ROS2": { name: "ROS2", icon: <Cpu />, color: "#4B82F6" }, 
  "AI/ML": { name: "AI/ML", icon: <BrainCircuit />, color: "#FF6F00" },
  "C++": { name: "C++", icon: <Code />, color: "#00599C" },
  "TensorFlow": { name: "TensorFlow", icon: <Database />, color: "#FF9A00" },
  "C": { name: "C", icon: <Code />, color: "#A8B9CC" },
  "Microcontrollers": { name: "Microcontrollers", icon: <Cpu />, color: "#4CAF50" },
  "Hardware": { name: "Hardware", icon: <Cpu />, color: "#795548" },
};
