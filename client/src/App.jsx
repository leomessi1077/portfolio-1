import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import axios from 'axios';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export default function App() {
  useEffect(() => {
    axios.post(`${API}/api/analytics/visit`).catch(() => {});
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main > section, footer');

    if (!('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('section-entered'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('section-entered');
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -8% 0px' });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </ThemeProvider>
  );
}
