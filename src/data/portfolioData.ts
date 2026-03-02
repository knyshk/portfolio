export interface Project {
  name: string;
  desc: string;
  tech: string[];
  link: string;
  color: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  concepts: string[];
}

export const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export const PROJECTS: Project[] = [
  {
    name: 'Newscope — Personal News Analyst',
    desc: 'Built a news analysis system combining RSS feed scraping, vector database storage, and AI-based Q&A using RAG and LangChain agents.',
    tech: ['Python', 'LangChain', 'RAG', 'Generative AI', 'LLMs', 'Streamlit', 'ChromaDB'],
    link: 'https://github.com/knyshk/newscope',
    color: 'bg-neo-yellow'
  },
  {
  "name": "SVD Based Image Steganography",
  "desc": "Built a deterministic steganography system that hides UTF 8 text in the blue channel using SVD, embedding data in selected singular values with NumPy based non blind extraction.",
  "tech": [
    "Python",
    "NumPy",
    "Linear Algebra",
    "Singular Value Decomposition",
    "Pillow",
    "Matplotlib",
    "Image Processing",
    "Cryptography Concepts"
  ],
  "link": "https://github.com/knyshk/SVD-Based-Image-Steganography",
  "color": "bg-neo-blue"
},
  {
    name: 'Hostel Cleanliness Management System',
    desc: 'Designed a web-based system for managing hostel cleanliness operations with live slot booking and task tracking.',
    tech: ['HTML', 'Tailwind CSS', 'NodeJS', 'SQL', 'JavaScript'],
    link: 'https://github.com/knyshk/College-Cleanliness-Management',
    color: 'bg-neo-pink'
  },
  {
  "name": "Driver Drowsiness Detection System",
  "desc": "Built a real time deep learning system that detects driver fatigue using CNN based eye and mouth analysis with facial landmarks and an integrated alert system.",
  "tech": [
    "Python",
    "TensorFlow",
    "Keras",
    "OpenCV",
    "MediaPipe",
    "Scikit Learn",
    "Matplotlib",
    "Deep Learning",
    "Computer Vision"
  ],
  "link": "https://github.com/knyshk/Driver-Drowsiness-Detection-System",
  "color": "bg-neo-yellow"
}
];

export const SKILLS: Skills = {
  languages: ['Python', 'C/C++', 'JavaScript', 'SQL', 'MongoDB', 'Kotlin'],
  frameworks: ['NodeJS', 'ReactJS', 'ExpressJS', 'Tailwind CSS', 'TensorFlow', 'Keras', 'LangChain', 'Streamlit'],
  tools: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'ChromaDB', 'Wireshark', 'Ubuntu CLI'],
  concepts: ['DSA', 'Machine Learning', 'Computer Networks', 'Deep Learning', 'Generative AI', 'LLMs']
};
