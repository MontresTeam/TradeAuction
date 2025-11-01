import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 relative">
      {/* CTA Section */}
      <div className="border-b border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="text-orange-500 text-2xl mt-1">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-1">Find us</h4>
                <span className="text-gray-400">Moza Plaza - 1 Al Khor St - Deira - Dubai</span>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="text-orange-500 text-2xl mt-1">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-1">Call us</h4>
                <span className="text-gray-400">+97142671124</span>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="text-orange-500 text-2xl mt-1">
                <i className="far fa-envelope-open"></i>
              </div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-1">Mail us</h4>
                <span className="text-gray-400">support@tradeauct.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="mb-6">
                <a href="/" className="block">
                  <span className="text-white text-2xl font-bold">TRADEAUCT</span>
                </a>
              </div>
              <div className="text-gray-400 leading-relaxed">
                <p>TRADEAUCT is your premier online auction platform for rare collectibles, luxury items, and exclusive assets. 
                Join our community of serious bidders and sellers today.</p>
              </div>
              <div className="space-y-4">
                <span className="text-white font-semibold block">Follow us</span>
                <div className="flex space-x-3">
                  <a href="#" className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="space-y-6">
              <div className="relative">
                <h3 className="text-white text-xl font-semibold mb-4">Auction Links</h3>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500 -mb-4"></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Live Auctions</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Upcoming Auctions</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Past Auctions</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Bid Now</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Sell with Us</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Auction Calendar</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Buyer's Guide</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Seller's Guide</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">FAQ</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors block py-1">Support</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div className="relative">
                <h3 className="text-white text-xl font-semibold mb-4">Auction Updates</h3>
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500 -mb-4"></div>
              </div>
              <div className="text-gray-400 leading-relaxed">
                <p>Don't miss out on exclusive auctions and rare items. Subscribe to get notified about upcoming auctions and special events.</p>
              </div>
              <div className="relative">
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-lg transition-colors"
                  >
                    <i className="fab fa-telegram-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Copyright &copy; {new Date().getFullYear()} TRADEAUCT. All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Home</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;