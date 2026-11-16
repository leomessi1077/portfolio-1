import { FaWhatsapp } from 'react-icons/fa';

const whatsappUrl = `https://wa.me/917571875252?text=${encodeURIComponent(
  'Hi Manish, I found your portfolio and would like to connect.'
)}`;

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Manish on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
