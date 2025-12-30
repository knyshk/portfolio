// index.js
export const servicesData = [
  {
    title: "Full-Stack Web Development",
    description:
      "Building end-to-end web applications with React, Node.js, and modern frameworks. From responsive frontends to robust backend APIs, I deliver complete solutions that scale with your needs.",
    items: [
      {
        title: "Frontend Development",
        description: "(React, Tailwind CSS, Bootstrap, HTML/CSS, JavaScript)",
      },
      {
        title: "Backend Engineering",
        description: "(Node.js, Express.js, REST APIs, Authentication Systems)",
      },
      {
        title: "Database Architecture",
        description: "(SQL, MongoDB, Data Modeling, Optimization)",
      },
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Creating high-performance mobile applications for Android and cross-platform environments. Building intuitive, responsive applications that deliver seamless user experiences.",
    items: [
      {
        title: "Cross-Platform Development",
        description: "(React Native, Responsive Design, Code Reusability)",
      },
      {
        title: "Native Android Development",
        description: "(Kotlin, Android SDK, Native Performance)",
      },
      {
        title: "App Architecture",
        description: "(Component Design, State Management, User Experience)",
      },
    ],
  },
  {
    title: "System Design & Performance Optimization",
    description:
      "Designing scalable architectures and optimizing application performance. Analyzing algorithms, network protocols, and system bottlenecks to build efficient, high-performance solutions.",
    items: [
      {
        title: "Algorithm & Data Structure Design",
        description: "Architecting efficient solutions with optimal time and space complexity",
      },
      {
        title: "Network Performance Analysis",
        description: "Optimizing communication protocols and analyzing network performance metrics",
      },
      {
        title: "Database Optimization",
        description: "Designing efficient data models and query optimization strategies",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Leveraging cutting-edge AI technologies to solve complex problems. Building intelligent systems with LLMs, RAG architectures, and generative AI for automation and insights.",
    items: [
      {
        title: "Generative AI Solutions",
        description: "(LLMs, LangChain, Prompt Engineering, ChatGPT Integration)",
      },
      {
        title: "Retrieval-Augmented Generation",
        description: "(RAG, ChromaDB, Vector Databases, Knowledge Systems)",
      },
      {
        title: "Machine Learning Models",
        description: "(TensorFlow, Keras, Data Analysis, Pandas, Scikit-learn)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "News Explorer — Personal News Analyst",
    description:
      "AI-powered news analysis system combining RSS feed scraping, vector database storage, and RAG-based Q&A using LangChain agents. Provides real-time, contextual responses with seamless interoperability between OpenAI GPT and Google Gemini.",
    href: "https://github.com/knyshk/newscope",
    image: "/assets/projects/news_explorer.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "LangChain" },
      { id: 3, name: "ChromaDB" },
      { id: 4, name: "Gemini API" },
      { id: 5, name: "Streamlit" },
    ],
  },
  {
    id: 2,
    name: "Performance Analyzer for TCP, UDP, and QUIC",
    description:
      "Client-server performance analysis tool comparing TCP, UDP, and QUIC protocols using iperf. Analyzes throughput, latency, and packet loss across varied network scenarios with comprehensive benchmarking capabilities.",
    href: "",
    image: "/assets/projects/TCP&UDP.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "C Programming" },
      { id: 2, name: "Python" },
      { id: 3, name: "OpenSSL" },
      { id: 4, name: "Wireshark" },
      { id: 5, name: "Socket Programming" },
    ],
  },
  {
    id: 3,
    name: "Stock Price Predictor",
    description:
      "Machine learning-based stock price prediction system using historical data and advanced ML algorithms. Features real-time API integration for live predictions and interactive data visualization.",
    href: "https://github.com/Knyshk/Stock-Market-Prediction",
    image: "/assets/projects/spam.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "TensorFlow" },
      { id: 3, name: "Pandas" },
      { id: 4, name: "Matplotlib" },
      { id: 5, name: "API Integration" },
    ],
  },
  {
    id: 4,
    name: "Hostel Cleanliness Management System",
    description:
      "Web-based hostel operations management system with live slot booking and task tracking. Streamlines cleanliness operations with real-time scheduling and automated task assignment.",
    href: "https://github.com/Knyshk/Hostel-Cleanliness-Management-Web-Application",
    image: "/assets/projects/hostel.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "HTML/CSS" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "SQL" },
      { id: 5, name: "JavaScript" },
    ],
  },
];
export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/kanishk-jain-a630b5286/", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/Knyshk", icon: "github" },
  { name: "Instagram", href: "https://www.instagram.com/knyshk_04/", icon: "instagram" },  
];