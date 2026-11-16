import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { Link } from 'react-scroll';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/leomessi1077' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/' },
  { icon: <FiMail />, href: 'mailto:yadavmanish7675@gmail.com' },
];

const navLinks = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="logo-text">MK<span className="logo-dot">.</span></div>
            <p>Full Stack Developer specializing in scalable backend systems and modern web applications.</p>
          </div>

          <div className="footer__nav">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map(l => (
                <li key={l}>
                  <Link to={l} smooth duration={600} offset={-70} className="footer-link">
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Contact</h4>
            <p>yadavmanish7675@gmail.com</p>
            <p>+91 7571875252</p>
            <p>Gorakhpur, UP</p>
            <div className="footer__socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-icon">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Manish Kumar Yadav. Built with <FiHeart className="heart" /> using MERN Stack.</p>
        </div>
      </div>
    </footer>
  );
}
