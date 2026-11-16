import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useScrollVisible } from '../hooks/useScrollVisible';

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with cart management, checkout, seller dashboard, role-based access, and Razorpay payment integration.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Razorpay', 'bcrypt'],
    github: 'https://github.com/leomessi1077/E-commerce',
    live: 'https://e-commerce-5t27.vercel.app/',
    color: '#6c63ff',
    year: '2025',
    highlights: [
      'JWT auth with role-based access (user/seller/admin)',
      'Razorpay integration with cryptographic verification',
      'Real-time order tracking & inventory management',
      'Seller dashboard with CRUD & analytics',
    ],
  },
  {
    title: 'Real-Time Chat App',
    description:
      'WhatsApp-inspired messaging platform with Socket.io for real-time communication, typing indicators, user status, and JWT session management.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/leomessi1077/chat-boat-',
    live: 'https://chat-rouge-xi-64.vercel.app/login',
    color: '#00d4aa',
    year: '2025',
    highlights: [
      'Real-time messaging with Socket.io',
      'Typing indicators & online status',
      '7-day session management with JWT',
      'Optimized MongoDB indexing for fast retrieval',
    ],
  },
  {
    title: 'Bug Reporting System',
    description:
      'Enterprise bug tracking system built at K-lite with real-time issue tracking, filtering, analytics dashboard, and team coordination workflows.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    github: null,
    live: null,
    color: '#ff6584',
    year: '2025',
    highlights: [
      'Real-time bug tracking & resolution',
      'Analytics dashboard for QA teams',
      'Filtering by severity, team, status',
      'API-driven workflow management',
    ],
  },
  {
    title: 'WebRTC Video Calling',
    description:
      'Real-time video calling feature integrated into a production product at Livnium, enabling peer-to-peer communication for client use.',
    tech: ['Node.js', 'WebRTC', 'Socket.io', 'Express.js'],
    github: null,
    live: null,
    color: '#ffa500',
    year: '2025',
    highlights: [
      'Peer-to-peer video/audio communication',
      'Signaling server with Socket.io',
      'Integrated into existing Node.js backend',
      'Deployed and used by real clients',
    ],
  },
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [ref, visible] = useScrollVisible();

  const filtered = filter === 'All' ? projects : projects.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">My <span className="accent">Projects</span></h2>
          <p className="section__subtitle">Things I've built that I'm proud of</p>
        </motion.div>

        <motion.div
          className="filter-bar"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {['All', 'MongoDB', 'Node.js', 'React.js', 'Socket.io', 'WebRTC'].map(t => (
            <button
              key={t}
              className={`filter-btn ${filter === t ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </motion.div>

        <div className="projects__grid">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -8 }}
              >
                <div className="project-card__top" style={{ borderTop: `3px solid ${project.color}` }}>
                  <div className="project-card__title-row">
                    <h3 className="project-title" style={{ color: project.color }}>{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <ul className="project-highlights">
                    {project.highlights.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </div>
                <div className="project-card__bottom">
                  <div className="project-techs">
                    {project.tech.map(t => (
                      <span key={t} className="tech-chip">{t}</span>
                    ))}
                  </div>
                  {(project.github || project.live) && (
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                          <FiGithub /> Code
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
