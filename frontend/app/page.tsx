'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // GSAP ScrollTrigger setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Product section animation
    gsap.fromTo(
      '.product-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );

    // Timeline section animation
    gsap.fromTo(
      '.timeline-item',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );
  }, []);

  // Particle effect initialization
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Product filter logic
  const products = [
    { id: 'classic', name: 'Coca-Cola Classic', description: 'The original, refreshing taste that started it all.', image: '/coke-classic.jpg', category: 'classic' },
    { id: 'zero', name: 'Coca-Cola Zero', description: 'Bold flavor with zero sugar, perfect for any moment.', image: '/coke-zero.jpg', category: 'zero-sugar' },
    { id: 'diet', name: 'Diet Coke', description: 'Light, crisp, and refreshing with no calories.', image: '/coke-diet.jpg', category: 'diet' },
  ];

  const filteredProducts = filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-red-50 to-gray-100">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: ['#ef4444', '#ffffff', '#d1d5db'] },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none',
              random: true,
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' },
            },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Navbar */}
     

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center min-h-[80vh] py-16 md:py-24">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-red-600 mb-6 tracking-tight"
          style={{ fontFamily: "'CocaCola', sans-serif" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Taste the Future
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mb-10 px-4 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          Experience the iconic refreshment of Coca-Cola, reimagined for a new era. Join us in celebrating life’s moments.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/products"
            className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-4 px-10 rounded-full hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Discover Our Drinks
          </Link>
        </motion.div>
      </main>

      {/* Product Highlight Section */}
      <section className="products-section py-16 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Our Iconic Beverages
          </h3>
          {/* Product Filter Bar */}
          <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md rounded-full py-2 px-4 mb-8 flex justify-center space-x-4">
            {['all', 'classic', 'zero-sugar', 'diet'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === category ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All' : category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand History Timeline */}
      <section className="timeline-section py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Our Legacy
          </h3>
          <div className="space-y-12">
            <div className="timeline-item flex flex-col md:flex-row items-center hover:bg-white/50 hover:shadow-md transition-all duration-300 rounded-lg p-4">
              <div className="md:w-1/3">
                <Image
                  src="/history-1886.jpg" // Use local image; replace with external URL if preferred
                  // src="https://www.coca-colacompany.com/content/dam/company/us/en/about-us/history/coca-cola-history-bottler-small-campaigncard.jpeg/width1960.jpeg"
                  alt="1886 Coca-Cola Creation"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                <h4 className="text-xl font-semibold text-gray-800">1886: The Beginning</h4>
                <p className="text-sm text-gray-600">
                  Created by Dr. John S. Pemberton in Atlanta, Georgia, Coca-Cola was born as a fountain drink, sparking a global legacy.
                </p>
              </div>
            </div>
            <div className="timeline-item flex flex-col md:flex-row-reverse items-center hover:bg-white/50 hover:shadow-md transition-all duration-300 rounded-lg p-4">
              <div className="md:w-1/3">
                <Image
                  src="/history-1920.jpg"
                  alt="1920s Coca-Cola Expansion"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:w-2/3 md:pr-8 mt-4 md:mt-0">
                <h4 className="text-xl font-semibold text-gray-800">1920s: Global Expansion</h4>
                <p className="text-sm text-gray-600">
                  Coca-Cola began its journey to become a global icon, reaching new markets worldwide.
                </p>
              </div>
            </div>
            <div className="timeline-item flex flex-col md:flex-row items-center hover:bg-white/50 hover:shadow-md transition-all duration-300 rounded-lg p-4">
              <div className="md:w-1/3">
                <Image
                  src="/history-1985.jpg"
                  alt="1985 New Coke"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                <h4 className="text-xl font-semibold text-gray-800">1985: New Coke & Classic Return</h4>
                <p className="text-sm text-gray-600">
                  The launch of New Coke and the triumphant return of Coca-Cola Classic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div>
              <h3
                className="text-2xl font-bold mb-4 text-red-500"
                style={{ fontFamily: "'CocaCola', sans-serif" }}
              >
                Coca-Cola
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Crafting refreshing moments since 1886. Explore our beverages and join our global community.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300"
                  >
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Connect With Us</h3>
              <div className="flex space-x-5 mb-6">
                <a
                  href="https://twitter.com/cocacola"
                  className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/cocacola"
                  className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/cocacola"
                  className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.513.069-2.974.364-4.162 1.552-1.188 1.188-1.483 2.649-1.552 4.162-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.069 1.513.364 2.974 1.552 4.162 1.188 1.188 2.649 1.483 4.162 1.552 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.513-.069 2.974-.364 4.162-1.552 1.188-1.188 1.483-2.649 1.552-4.162.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.069-1.513-.364-2.974-1.552-4.162-1.188-1.188-2.649-1.483-4.162-1.552-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Stay Refreshed</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  try {
                    const response = await fetch('/api/newsletter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    });
                    if (response.ok) alert('Subscribed!');
                    else alert('Subscription failed.');
                  } catch {
                    alert('Error occurred.');
                  }
                }}
                className="flex flex-col space-y-3"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-full text-gray-800 bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  aria-label="Email for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} The Coca-Cola Company. All rights reserved.
            <div className="mt-2 space-x-4">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-red-500 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-red-500 transition-all duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}