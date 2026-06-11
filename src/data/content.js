export const stats = [
  { value: 6, suffix: '+', label: 'End-to-end projects shipped' },
  { value: 4, suffix: '', label: 'Tech stacks worked with' },
  { value: 2, suffix: '', label: 'Production apps deployed' },
  { value: 1, suffix: '', label: 'Industry internship (Wipro)' },
];

export const skillGroups = [
  {
    badge: 'LANGUAGES',
    title: 'Programming',
    description: 'Python, JavaScript, C++, SQL',
    chips: ['Python', 'JavaScript', 'C++', 'SQL'],
  },
  {
    badge: 'FRONTEND',
    title: 'User Interfaces',
    description: 'React.js, Next.js 14, Vite, Tailwind CSS',
    chips: ['React.js', 'Next.js 14', 'Vite', 'Tailwind CSS'],
  },
  {
    badge: 'BACKEND',
    title: 'APIs & Realtime',
    description: 'FastAPI, Node.js, Express.js, WebSockets',
    chips: ['FastAPI', 'Node.js', 'Express.js', 'WebSockets'],
  },
  {
    badge: 'AI / LLM',
    title: 'Search & RAG',
    description: 'RAG, LangChain, sentence-transformers, Gemini API',
    chips: ['RAG', 'LangChain', 'sentence-transformers', 'Gemini API'],
  },
  {
    badge: 'DATABASES',
    title: 'Data Stores',
    description: 'PostgreSQL, MongoDB Atlas, SQLite, ChromaDB',
    chips: ['PostgreSQL', 'MongoDB Atlas', 'SQLite', 'ChromaDB'],
  },
  {
    badge: 'DEVOPS',
    title: 'Delivery',
    description: 'Docker, Docker Compose, GitHub Actions, Linux, Vercel',
    chips: ['Docker', 'Docker Compose', 'GitHub Actions', 'Vercel'],
  },
];

export const experienceBullets = [
  'Assisted in building REST APIs using Node.js and Python, focusing on database query optimization and caching strategies.',
  'Developed interactive frontend dashboards using React.js and Tailwind CSS for real-time data monitoring.',
  'Helped containerize local development setups using Docker, simplifying environment configuration for the team.',
];

export const projects = [
  {
    badge: 'PROJECT #01',
    title: 'Defense GPT',
    period: 'Jan 2026',
    body: 'AI-powered exam prep platform with a PDF-based RAG pipeline and multimodal streaming responses.',
    chips: ['FastAPI', 'Next.js', 'LangChain', 'Docker', 'MongoDB Atlas Vector Search'],
    links: {
      live: 'https://defense-gpt.vercel.app/',
      github: 'https://github.com/Siphon18/defense-gpt',
    },
    bullets: [
      'Reduced document retrieval latency by 35% using sentence-transformers and MongoDB Atlas Vector Search.',
      'Integrated Groq/Llama 3 and Gemini APIs to support 100+ concurrent users with chat memory and MCQ generation.',
      'Deployed backend services using Docker and Hugging Face Spaces.',
    ],
  },
  {
    badge: 'PROJECT #02',
    title: 'DevChat',
    period: 'Oct 2025',
    body: 'Real-time collaboration platform built for messaging, typing indicators, file uploads, and live execution output.',
    chips: ['React', 'FastAPI', 'WebSockets', 'PostgreSQL', 'Docker Compose'],
    links: {
      live: 'https://devchat.adityachengaria043.workers.dev/',
      github: 'https://github.com/Siphon18/devchat',
    },
    bullets: [
      'Processed 500+ events per minute with sub-50ms latency for live messaging and collaboration.',
      'Implemented JWT/OAuth authentication and a restricted Python execution environment with real-time output streaming.',
      'Containerized services using Docker Compose and automated CI/CD deployments with GitHub Actions.',
    ],
  },
];

export const education = [
  {
    badge: 'EDUCATION',
    title: 'Chandigarh University',
    period: 'Aug 2021 – Jun 2025',
    body: 'B.Tech in Computer Science Engineering, Punjab, India',
  },
];

export const certifications = [
  'DeepLearning.AI: Intro to TensorFlow',
  'University of Michigan: Web Apps in Django',
  'Infosys: Machine Learning',
  'NPTEL: Introduction to Internet of Things',
];

export const contactLinks = {
  email: 'mailto:adityachengaria043@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aditya-singh-625918230/',
  github: 'https://github.com/Siphon18',
  resume: '/Aditya_Resume_Fullstack.pdf',
};

export const marqueeTop = [
  'React.js', '★', 'FastAPI', '★', 'RAG Pipelines', '★', 'WebSockets', '★', 'Docker', '★',
  'Next.js 14', '★', 'MongoDB Atlas', '★', 'JWT / OAuth', '★', 'GitHub Actions', '★', 'Redis', '★',
];

export const marqueeBottom = [
  'Python', '·', 'JavaScript', '·', 'Tailwind CSS', '·', 'LangChain', '·', 'Vercel', '·',
  'SQLite', '·', 'ChromaDB', '·', 'Express.js', '·', 'PostgreSQL', '·', 'Linux', '·',
];

export const NAV_SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

export const coreStack = [
  'Python', 'JavaScript', 'React.js', 'Next.js 14', 'FastAPI',
  'Node.js', 'MongoDB Atlas', 'PostgreSQL', 'Docker', 'Tailwind CSS',
];

export const experienceChips = [
  'Node.js', 'React', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs',
];
