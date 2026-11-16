import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useScrollVisible } from '../hooks/useScrollVisible';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'yadavmanish7675@gmail.com', href: 'mailto:yadavmanish7675@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 7571875252', href: 'tel:+917571875252' },
  { icon: <FiMapPin />, label: 'Location', value: 'Gorakhpur, Uttar Pradesh', href: null },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/manish-kumar-yadav-6879691a0', href: 'https://www.linkedin.com/in/manish-kumar-yadav-6879691a0/' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/leomessi1077', href: 'https://github.com/leomessi1077' },
];

export default function Contact() {
  const [ref, visible] = useScrollVisible();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/api/contact`, form);
      toast.success('Message sent! I\'ll reply within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">Get In <span className="accent">Touch</span></h2>
          <p className="section__subtitle">Let's work together or just say hi!</p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Let's Build Something <span className="accent">Great Together</span></h3>
            <p>
              Whether you have a project in mind, want to collaborate on freelance work, or are
              looking for a full-time developer — I'd love to hear from you!
            </p>
            <div className="contact__details">
              {contactInfo.map(c => (
                <div key={c.label} className="contact-detail">
                  <span className="contact-detail__icon">{c.icon}</span>
                  <div>
                    <span className="contact-detail__label">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="contact-detail__value">
                        {c.value}
                      </a>
                    ) : (
                      <span className="contact-detail__value">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Discussion / Job Opportunity" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Tell me about your project or how I can help..." />
            </div>
            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? 'Sending...' : <><FiSend /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
