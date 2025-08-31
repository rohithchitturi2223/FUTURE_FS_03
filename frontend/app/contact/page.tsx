'use client'; // Mark as client component due to form handling

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${strapiUrl}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
            ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            : undefined,
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit contact form');
      }

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-red-600 mb-8 text-center" style={{ fontFamily: "'CocaCola', sans-serif" }}>
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-12">
            We’d love to hear from you! Fill out the form below to get in touch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Your Message"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {status && (
              <p
                className={`text-center mt-4 ${
                  status.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {status}
              </p>
            )}
          </form>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-600 mb-2">Email: support@coca-cola.com</p>
            <p className="text-gray-600 mb-2">Phone: +1-800-123-4567</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://twitter.com/cocacola" className="text-gray-600 hover:text-red-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://facebook.com/cocacola" className="text-gray-600 hover:text-red-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://instagram.com/cocacola" className="text-gray-600 hover:text-red-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.513.069-2.974.364-4.162 1.552-1.188 1.188-1.483 2.649-1.552 4.162-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.069 1.513.364 2.974 1.552 4.162 1.188 1.188 2.649 1.483 4.162 1.552 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.513-.069 2.974-.364 4.162-1.552 1.188-1.188 1.483-2.649 1.552-4.162.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.069-1.513-.364-2.974-1.552-4.162-1.188-1.188-2.649-1.483-4.162-1.552-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}