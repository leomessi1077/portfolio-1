import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const links = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar__logo">
        <span className="logo-text">MK</span>
        <span className="logo-dot">.</span>
      </div>

      <ul className="navbar__links">
        {links.map(l => (
          <li key={l}>
            <Link to={l} smooth duration={600} offset={-70} className="nav-link" activeClass="nav-link--active" spy>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <a
          href="/Manish_Kumar_Yadav_Resume.pdf"
          download
          className="btn btn--outline btn--sm"
        >
          Resume
        </a>
        <button className="hamburger" onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(l => (
              <li key={l}>
                <Link
                  to={l} smooth duration={600} offset={-70} className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
