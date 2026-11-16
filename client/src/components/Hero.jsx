import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/leomessi1077', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:yadavmanish7675@gmail.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="hero__content">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Manish Kumar Yadav
        </motion.h1>

        <motion.div
          className="hero__role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer', 2000,
              'Backend Specialist', 2000,
              'Node.js Engineer', 2000,
              'React Developer', 2000,
              'Freelance Developer', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          className="hero__bio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          I build scalable backend systems and beautiful frontends. With 2+ years of experience
          at product startups, I architect solutions that perform under real-world load.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Link to="projects" smooth duration={600} offset={-70} className="btn btn--primary">
            View Projects
          </Link>
          <Link to="contact" smooth duration={600} offset={-70} className="btn btn--outline">
            Hire Me
          </Link>
        </motion.div>

        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Link to="about" smooth duration={600} offset={-70}>
          <FiArrowDown className="bounce" />
        </Link>
      </motion.div>
    </section>
  );
}
