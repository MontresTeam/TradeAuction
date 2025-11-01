"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaGavel, FaSearch, FaBars, FaTimes, FaChevronDown, FaArrowRight } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const mobileMenuRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: "Watches", href: "/watches" },
    { name: "Jewelry", href: "/categories/jewelry"},
    { name: "Bags", href: "/categories/bags" },
    { name: "Electronics", href: "/categories/electronics"},
    { name: "Collectibles", href: "/categories/collectibles" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Live Auctions", href: "/LiveAuction", badge: "Live" },
    { name: "Upcoming Auctions", href: "/UpcomingAuction" },
    { name: "Past Auctions", href: "/past" },
    { name: "Sell", href: "/sell", highlight: true }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search submitted');
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log('Sign up clicked');
    // You can redirect to signup page or open a modal
    window.location.href = '/register';
  };

  return (
    <header className="bg-white text-black shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer tracking-tighter bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
            TRADEAUCT
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`font-medium hover:text-gray-600 transition-colors duration-200 flex items-center space-x-1 ${
                    link.highlight ? 'text-blue-600 hover:text-blue-700' : ''
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </a>
              </div>
            ))}
            
            {/* Categories Dropdown */}
            <div className="relative group" ref={categoriesDropdownRef}>
              <button className="font-medium hover:text-gray-600 transition-colors duration-200 flex items-center space-x-1">
                <span>Categories</span>
                <FaChevronDown className="text-xs mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-xl shadow-2xl border border-gray-200 min-w-[240px] z-50 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-700">Auction Categories</h3>
                </div>
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="flex items-center space-x-3 px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 group"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium group-hover:text-gray-700">{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Desktop Search & User */}
          <div className="hidden lg:flex items-center space-x-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search auctions..."
                className={`rounded-full px-4 py-2.5 text-gray-900 border transition-all duration-200 focus:outline-none w-64 ${
                  isSearchFocused 
                    ? 'border-gray-400 ring-2 ring-gray-200' 
                    : 'border-gray-300'
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaSearch />
              </button>
            </form>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/account" 
                className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200 group"
              >
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200">
                  <FaUser className="text-sm" />
                </div>
                <span className="font-medium">Account</span>
              </a>
              
              {/* Sign Up Button - Desktop */}
              <button
                onClick={handleSignUp}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Sign Up</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Search Bar - Always visible on mobile */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search auctions, brands, categories..."
              className="w-full rounded-full px-4 py-3 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-t border-gray-200 animate-fade-in"
        >
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                    link.highlight 
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                      : 'hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
              
              {/* Mobile Categories */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  className="flex items-center justify-between w-full font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <FaGavel className="text-gray-500" />
                    <span>Categories</span>
                  </div>
                  <FaChevronDown 
                    className={`text-xs transition-transform duration-200 ${
                      isCategoriesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isCategoriesOpen && (
                  <div className="mt-1 ml-4 space-y-1 bg-gray-50 rounded-lg p-2">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-3 py-2.5 px-3 text-gray-700 hover:text-black hover:bg-white rounded-md transition-all duration-200"
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Account Links */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <a
                  href="/account"
                  className="flex items-center space-x-3 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-full bg-gray-100">
                    <FaUser className="text-sm" />
                  </div>
                  <span>My Account</span>
                </a>
                
                {/* Mobile Sign Up Button */}
                <button
                  onClick={() => {
                    handleSignUp();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Sign Up Free</span>
                  <FaArrowRight className="text-xs" />
                </button>
                
                {/* Additional mobile-only sign up prompt */}
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    Join thousands of auction enthusiasts
                  </p>
                  <p className="text-xs text-blue-600">
                    Free to sign up • No commitment
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;