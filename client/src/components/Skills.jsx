import { motion } from 'framer-motion';
import { useScrollVisible } from '../hooks/useScrollVisible';

const skillGroups = [
  {
    category: 'Frontend',
    color: '#6c63ff',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Bootstrap', level: 75 },
    ],
  },
  {
    category: 'Backend',
    color: '#00d4aa',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'Socket.io', level: 80 },
      { name: 'Java', level: 78 },
    ],
  },
  {
    category: 'Database & DevOps',
    color: '#ff6584',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 75 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 65 },
      { name: 'CI/CD', level: 68 },
    ],
  },
];

const techTags = [
  'Node.js', 'React', 'MongoDB', 'Express', 'Socket.io', 'JWT', 'REST APIs',
  'WebRTC', 'Docker', 'AWS', 'MySQL', 'Java', 'DSA', 'OOP', 'Razorpay',
  'Nodemailer', 'Bcrypt', 'Git', 'Shopify', 'Tailwind',
];

export default function Skills() {
  const [ref, visible] = useScrollVisible();

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">Technical <span className="accent">Skills</span></h2>
          <p className="section__subtitle">Technologies I work with</p>
        </motion.div>

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="skill-card"
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.2, duration: 0.6 }}
            >
              <h3 className="skill-category" style={{ color: group.color }}>{group.category}</h3>
              {group.skills.map((skill, si) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-bar__fill"
                      style={{ background: group.color }}
                      initial={{ width: 0 }}
                      animate={visible ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: gi * 0.2 + si * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tech-tags"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="tech-tags__title">Also familiar with</h3>
          <div className="tags-wrap">
            {techTags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
