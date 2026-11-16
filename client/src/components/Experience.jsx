import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useScrollVisible } from '../hooks/useScrollVisible';

const experiences = [
  {
    company: 'K-lite',
    role: 'Backend Developer',
    period: 'Sep 2025 – Jan 2026',
    location: 'Delhi',
    color: '#6c63ff',
    highlights: [
      'Built task delegation and checklist systems with APIs, enhancing workflow management',
      'Resolved 100+ critical bugs through systematic debugging, improving stability',
      'Built comprehensive bug reporting system enabling real-time issue tracking',
      'Developed analytics dashboard with filtering providing insights for QA teams',
    ],
  },
  {
    company: 'Livnium',
    role: 'Backend Developer',
    period: 'Apr 2025 – Sep 2025',
    location: 'Mumbai, Maharashtra',
    color: '#00d4aa',
    highlights: [
      'Architected scalable Node.js systems handling 1000+ daily requests, boosting efficiency by 10%',
      'Developed real-time video calling with WebRTC for enhanced client communication',
      'Integrated AI-powered backend features enabling intelligent automation',
      'Optimized API response time by 12% through code architecture improvements',
      'Delivered live client projects on schedule, increasing team efficiency by 9%',
    ],
  },
];

export default function Experience() {
  const [ref, visible] = useScrollVisible();

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">Work <span className="accent">Experience</span></h2>
          <p className="section__subtitle">Where I've built real products</p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="timeline__item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.3, duration: 0.6 }}
            >
              <div className="timeline__dot" style={{ background: exp.color }} />
              <div className="timeline__card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-company" style={{ color: exp.color }}>
                      <FiBriefcase className="exp-icon" /> {exp.company}
                    </h3>
                    <p className="exp-role">{exp.role}</p>
                  </div>
                  <div className="exp-meta">
                    <span><FiCalendar /> {exp.period}</span>
                    <span><FiMapPin /> {exp.location}</span>
                  </div>
                </div>
                <ul className="exp-highlights">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="training-card"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3>Training</h3>
          <div className="training-content">
            <div>
              <strong>Coding Ninjas</strong>
              <p>Full Stack Web Development — Backend · Frontend · Java · Data Structures</p>
            </div>
            <span className="training-period">Feb 2023 – Feb 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
