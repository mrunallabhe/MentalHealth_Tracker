import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="contact-box bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-md shadow-lg p-6 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Child Helpline</h2>
          <p className="text-lg">
            Phone: <a href="tel:+18001234567" className="text-blue-500 hover:text-blue-700">1800-123-4567</a>
          </p>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Organizer Contact</h2>
          <p className="text-lg">
            Phone: <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-700">+1 234-567-890</a>
          </p>
          <p className="text-lg">
            Email: <a href="mailto:organizer@gmail.com" className="text-blue-500 hover:text-blue-700">organizer@gmail.com</a>
          </p>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Social Media</h2>
          <p className="text-lg mb-4">
            Instagram:
            <a
              href="https://www.instagram.com/your_instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 ml-2"
            >
              <FontAwesomeIcon icon={faInstagram} /> your_instagram
            </a>
          </p>
          <p className="text-lg">
            Gmail:
            <a
              href="mailto:your_email@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <FontAwesomeIcon icon={faEnvelope} /> your_email@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
