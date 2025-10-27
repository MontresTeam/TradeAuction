"use client"
import React, { useState } from 'react';
import { 
  FiUser, 
  FiLogIn, 
  FiUserPlus, 
  FiMenu, 
  FiX, 
  FiSearch,
  FiBell,
  FiHeart,
  FiShoppingCart,
  FiHome,
  FiAward,
  FiGrid,
  FiInfo,
  FiPhone,
  FiClock
} from 'react-icons/fi';
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSignup = ()=>{
    router.push('/register')
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white p-2 rounded-lg">
                <FiAward className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] bg-clip-text text-transparent">
              TRADEAUCT
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e518e] focus:border-transparent"
                placeholder="Search auctions, products..."
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-[#1e518e] font-medium transition duration-200">
              <FiHome className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-[#1e518e] font-medium transition duration-200">
              <FiClock className="h-4 w-4" />
              <span>Live Auctions</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-[#1e518e] font-medium transition duration-200">
              <FiGrid className="h-4 w-4" />
              <span>Categories</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-[#1e518e] font-medium transition duration-200">
              <FiAward className="h-4 w-4" />
              <span>Featured</span>
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Search Icon - Mobile */}
            <button className="lg:hidden text-gray-600 hover:text-[#1e518e] p-2">
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="relative text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
              <FiHeart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart */}
            <button className="relative text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#1e518e] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
              <FiBell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#0061b0ee] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Auth Buttons / User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition duration-200"
                >
                  <FiUser className="h-5 w-5 text-gray-700" />
                  <span className="font-medium text-gray-700">John Doe</span>
                </button>
                
                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e]">
                      <FiUser className="h-4 w-4" />
                      <span>My Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e]">
                      <FiAward className="h-4 w-4" />
                      <span>My Bids</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e]">
                      <FiHeart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e]">
                      <FiShoppingCart className="h-4 w-4" />
                      <span>My Orders</span>
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <FiLogIn className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-[#1e518e] font-medium transition duration-200">
                  <FiLogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white px-4 py-2 rounded-lg font-medium hover:from-[#1a4780] hover:to-[#0055a0] transition duration-200 shadow-md" onClick={handleSignup}>
                  <FiUserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
              <FiSearch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#1e518e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e518e] transition duration-200"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              
              {/* Mobile Search */}
              <div className="px-3 pb-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e518e] focus:border-transparent"
                    placeholder="Search auctions..."
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiHome className="h-5 w-5" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiClock className="h-5 w-5" />
                <span>Live Auctions</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiGrid className="h-5 w-5" />
                <span>Categories</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiAward className="h-5 w-5" />
                <span>Featured Items</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiInfo className="h-5 w-5" />
                <span>About</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                <FiPhone className="h-5 w-5" />
                <span>Contact</span>
              </a>

              {/* Mobile Action Buttons */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex space-x-2 px-3 pb-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
                    <FiHeart className="h-5 w-5" />
                    <span className="text-sm">Wishlist</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
                    <FiShoppingCart className="h-5 w-5" />
                    <span className="text-sm">Cart</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 text-gray-600 hover:text-[#1e518e] p-2 transition duration-200">
                    <FiBell className="h-5 w-5" />
                    <span className="text-sm">Alerts</span>
                  </button>
                </div>

                {/* Mobile Auth Buttons */}
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                      <FiUser className="h-5 w-5" />
                      <span>My Profile</span>
                    </button>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition duration-200"
                    >
                      <FiLogIn className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg font-medium transition duration-200">
                      <FiLogIn className="h-5 w-5" />
                      <span>Login</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white px-3 py-2 rounded-lg font-medium hover:from-[#1a4780] hover:to-[#0055a0] transition duration-200">
                      <FiUserPlus className="h-5 w-5" />
                      <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;