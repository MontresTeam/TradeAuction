"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaGavel,
  FaUsers,
  FaHome,
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaCrown,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: FaHome,
    },
    {
      label: "Auctions",
      href: "/auctions",
      icon: FaGavel,
      dropdown: [
        { label: "Live Auctions", href: "/auctions/live", badge: "Live" },
        { label: "Upcoming Auctions", href: "/auctions/upcoming" },
        { label: "Past Auctions", href: "/auctions/past" },
        { label: "Auction Calendar", href: "/auctions/calendar" },
      ],
    },
    {
      label: "Categories",
      href: "/categories",
      icon: FaChevronDown,
      dropdown: [
        { label: "Art & Collectibles", href: "/categories/art", count: "124" },
        {
          label: "Jewelry & Watches",
          href: "/categories/jewelry",
          count: "89",
        },
        { label: "Electronics", href: "/categories/electronics", count: "256" },
        { label: "Vehicles", href: "/categories/vehicles", count: "42" },
        { label: "Real Estate", href: "/categories/real-estate", count: "18" },
        { label: "Antiques", href: "/categories/antiques", count: "67" },
      ],
    },
    {
      label: "For Sellers",
      href: "/sellers",
      icon: FaUsers,
      dropdown: [
        { label: "Sell Items", href: "/sellers/sell", featured: true },
        { label: "Seller Dashboard", href: "/sellers/dashboard" },
        { label: "Seller Guidelines", href: "/sellers/guidelines" },
        { label: "Commission Rates", href: "/sellers/commission" },
      ],
    },
    {
      label: "For Buyers",
      href: "/buyers",
      icon: FaUser,
      dropdown: [
        { label: "How to Bid", href: "/buyers/how-to-bid" },
        { label: "Buyer Resources", href: "/buyers/resources" },
        { label: "Bidding Tips", href: "/buyers/tips" },
        { label: "Payment Methods", href: "/buyers/payment" },
      ],
    },
  ];

  const userMenuItems = [
    { label: "My Profile", href: "/profile", icon: FaUser },
    { label: "My Bids", href: "/my-bids", icon: FaGavel },
    { label: "Watchlist", href: "/watchlist", icon: FaHeart },
    { label: "Purchase History", href: "/purchases", icon: FaShoppingCart },
    { label: "Settings", href: "/settings" },
  ];

  const isActiveLink = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Mock authentication state - change this based on your actual auth logic
  const isLoggedIn = false;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Left Section */}
          <div className="flex items-center flex-shrink-0" style={{marginRight:"16px"}}>
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              onClick={() => setMobileMenuOpen(false)}
              
            >
              <div className="w-10 h-10 bg-[#1e518e] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <FaGavel className="text-white text-lg" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold text-[#1e518e] group-hover:text-[#16457a] transition-all">
                  TradeOct
                </span>
                <span className="text-xs text-gray-500">Premium Auctions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden lg:flex lg:items-center lg:space-x-1 lg:flex-1 lg:justify-center"
            ref={dropdownRef}
          >
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-[#1e518e] cursor-pointer transition-colors duration-200 group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <item.icon className="text-sm flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                    <FaChevronDown className="text-xs mt-0.5 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e] transition-all duration-200 group relative overflow-hidden"
                          >
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <span className="font-medium truncate">
                                {dropdownItem.label}
                              </span>
                              {dropdownItem.featured && (
                                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap flex-shrink-0">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                              {dropdownItem.badge && (
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold animate-pulse whitespace-nowrap">
                                  {dropdownItem.badge}
                                </span>
                              )}
                              {dropdownItem.count && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                                  {dropdownItem.count}
                                </span>
                              )}
                              <div className="w-2 h-2 bg-[#1e518e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-4 py-2 font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                      isActiveLink(item.href)
                        ? "text-[#1e518e] bg-blue-50"
                        : "text-gray-700 hover:text-[#1e518e] hover:bg-blue-50"
                    }`}
                  >
                    <item.icon className="text-sm flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Search & User Actions */}
          <div className="flex items-center justify-end space-x-3 flex-shrink-0">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:block relative">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search items, auctions..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e518e] focus:border-transparent transition-all duration-200 w-64 bg-gray-50 focus:bg-white group-hover:bg-white shadow-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#1e518e] transition-colors" />
              </div>
            </div>

            {/* Conditional rendering based on authentication */}
            {isLoggedIn ? (
              // Logged in user view
              <div className="hidden lg:flex items-center space-x-3">
                {/* Quick Actions */}
                <div className="flex items-center space-x-1">
                  <button className="relative p-2.5 text-gray-600 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                    <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                      5
                    </span>
                  </button>

                  <button className="relative p-2.5 text-gray-600 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                    <FaBell className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                      3
                    </span>
                  </button>
                </div>

                {/* Premium Badge */}
                <div className="flex items-center">
                  <div className="bg-[#1e518e] text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                    <FaCrown className="text-xs" />
                    <span>Premium</span>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-blue-100"
                    onMouseEnter={() => setActiveDropdown("user")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="w-8 h-8 bg-[#1e518e] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span className="font-medium whitespace-nowrap">
                      John D.
                    </span>
                    <FaChevronDown className="text-xs mt-0.5 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                  </button>

                  {/* User Dropdown */}
                  {activeDropdown === "user" && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                        <p className="font-semibold text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">Premium Member</p>
                      </div>

                      {userMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#1e518e] transition-all duration-200 group"
                        >
                          {item.icon && (
                            <item.icon className="text-sm text-gray-400 group-hover:text-[#1e518e] flex-shrink-0" />
                          )}
                          <span className="flex-1">{item.label}</span>
                          <div className="w-2 h-2 bg-[#1e518e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                        </Link>
                      ))}

                      <div className="border-t border-gray-100 pt-2">
                        <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-lg font-medium">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Guest user view - Properly aligned auth buttons
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-gray-700 font-medium hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all duration-200 whitespace-nowrap border border-gray-200 hover:border-blue-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-[#1e518e] text-white font-semibold rounded-xl hover:bg-[#16457a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap border border-[#1e518e]"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button className="p-2.5 text-gray-600 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all">
                <FaSearch className="text-lg" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-gray-600 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all border border-gray-200"
              >
                {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4 max-h-screen overflow-y-auto">
            {/* User Info - Conditionally rendered */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4">
                <div className="w-12 h-12 bg-[#1e518e] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <FaUser className="text-white text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    John Doe
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Premium Member
                  </p>
                </div>
                <div className="bg-[#1e518e] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg flex-shrink-0">
                  <FaCrown className="text-xs" />
                  <span>Premium</span>
                </div>
              </div>
            ) : null}

            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search auctions..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between p-3 text-gray-700 font-medium cursor-pointer hover:bg-blue-50 hover:text-[#1e518e] rounded-xl transition-all border border-transparent hover:border-blue-100">
                        <div className="flex items-center space-x-3">
                          <item.icon className="text-sm flex-shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <FaChevronDown className="text-xs transition-transform group-open:rotate-180 flex-shrink-0" />
                      </summary>
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="flex items-center justify-between p-3 text-gray-600 hover:text-[#1e518e] hover:bg-blue-50 rounded-lg transition-all group"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="truncate">
                              {dropdownItem.label}
                            </span>
                            {dropdownItem.badge && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2 flex-shrink-0">
                                {dropdownItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 font-medium rounded-xl transition-all ${
                        isActiveLink(item.href)
                          ? "text-[#1e518e] bg-blue-50 border border-blue-100"
                          : "text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 border border-transparent"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="text-sm flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Quick Actions - Conditionally rendered */}
            {isLoggedIn && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <Link
                  href="/watchlist"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all border border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHeart className="flex-shrink-0" />
                  <span className="truncate">Watchlist</span>
                </Link>
                <Link
                  href="/my-bids"
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all border border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaGavel className="flex-shrink-0" />
                  <span className="truncate">My Bids</span>
                </Link>
              </div>
            )}

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {/* Sell Button for Mobile */}
              <Link
                href="/sell"
                className="flex items-center justify-center space-x-2 w-full bg-[#1e518e] text-white text-center py-3.5 rounded-xl font-semibold hover:bg-[#16457a] transition-all shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sell Item Now</span>
              </Link>

              {/* Conditionally render auth buttons */}
              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-all border border-gray-200 hover:border-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center py-3 bg-[#1e518e] text-white font-semibold hover:bg-[#16457a] rounded-xl transition-all shadow-lg hover:shadow-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                // Logged in user mobile menu options
                <div className="space-y-2">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#1e518e] hover:bg-blue-50 rounded-xl transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && (
                        <item.icon className="text-sm flex-shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;