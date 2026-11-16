import { motion } from 'framer-motion';
import CountUpModule from 'react-countup';
import { useScrollVisible } from '../hooks/useScrollVisible';

const CountUp = CountUpModule.default ?? CountUpModule;

const stats = [
  { value: 1, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Bugs Resolved' },
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 1000, suffix: '+', label: 'Daily API Requests Handled' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

export default function About() {
  const [ref, visible] = useScrollVisible();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
        >
          <h2 className="section__title">About <span className="accent">Me</span></h2>
          <p className="section__subtitle">Get to know me better</p>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__avatar-wrap"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={visible ? 'visible' : 'hidden'}
          >
            <div className="about__avatar">
              <span className="avatar-initials">MK</span>
            </div>
            <div className="about__badge">Open to Work</div>
          </motion.div>

          <motion.div
            className="about__text"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={visible ? 'visible' : 'hidden'}
          >
            <h3>Full Stack Developer <span className="accent">& Backend Specialist</span></h3>
            <p>
              I'm a Full Stack Developer with 2+ years of professional experience, specializing in
              building scalable Node.js backend systems and reactive React frontends. I've worked
              at product startups in Delhi and Mumbai delivering real-time features — including
              WebRTC video calling, AI-powered automation, and high-throughput REST APIs.
            </p>
            <p>
              I'm passionate about clean architecture, performance optimization, and building
              products that users love. Whether you need a complete web app or a reliable backend
              system, I deliver on time with quality you can trust.
            </p>

            <div className="about__info">
              {[
                ['Location', 'Gorakhpur, Uttar Pradesh'],
                ['Email', 'yadavmanish7675@gmail.com'],
                ['Phone', '+91 7571875252'],
                ['Availability', 'Freelance & Full-time'],
              ].map(([k, v]) => (
                <div key={k} className="info-row">
                  <span className="info-label">{k}:</span>
                  <span className="info-value">{v}</span>
                </div>
              ))}
            </div>

            <a href="/Manish_Kumar_Yadav_Resume.pdf" download className="btn btn--primary mt-1">
              Download Resume
            </a>
          </motion.div>
        </div>

        <div className="stats__grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              variants={fadeUp}
              custom={i + 3}
              initial="hidden"
              animate={visible ? 'visible' : 'hidden'}
            >
              <div className="stat-value">
                {visible ? <CountUp end={s.value} duration={2.5} suffix={s.suffix} /> : '0'}
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
