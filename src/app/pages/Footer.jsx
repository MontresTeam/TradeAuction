import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">TradeOct</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for exclusive auctions and premium items. 
              Discover unique opportunities and bid with confidence.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-yellow-400 flex-shrink-0" />
                <span>123 Business District, Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-yellow-400 flex-shrink-0" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                <span>info@tradeoct.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b-2 border-yellow-400 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About', 'Auctions', 'Contact', 'FAQ', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b-2 border-yellow-400 inline-block">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Subscribe to get updates on latest auctions, exclusive items, and special offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105 active:scale-95"
              >
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Social & Map */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b-2 border-yellow-400 inline-block">
              Follow Us
            </h3>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: FaFacebookF, url: 'https://facebook.com', color: 'hover:text-blue-400' },
                { icon: FaTwitter, url: 'https://twitter.com', color: 'hover:text-blue-300' },
                { icon: FaInstagram, url: 'https://instagram.com', color: 'hover:text-pink-400' },
                { icon: FaLinkedinIn, url: 'https://linkedin.com', color: 'hover:text-blue-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-800 p-3 rounded-full text-white transition-all duration-200 transform hover:scale-110 ${social.color}`}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>

            {/* Mini Map */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-32 rounded-lg overflow-hidden">
                <iframe
                  title="TradeOct Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.123456789!2d55.123456!3d25.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f123456789abc%3A0x123456789abcdef!2sYour%20Business%20Address!5e0!3m2!1sen!2sae!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} TradeOct. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-yellow-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer