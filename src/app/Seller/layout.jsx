"use client"
import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiPackage, 
  FiPlus, 
  FiBarChart2, 
  FiShoppingCart,
  FiTrendingUp,
  FiUsers, 
  FiMessageSquare, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiLogOut,
  FiUser,
  FiHelpCircle,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';

const SellerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Seller Sidebar Component
const SellerSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  // Sync active item with current route
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/Seller', notification: 0 },
 { id: 'products', label: 'Products', icon: FiPackage, path: '/Seller/products/add', notification: 3 },
    { id: 'upload', label: 'Upload Product', icon: FiPlus, path: '/vendorUploadProduct', notification: 0 },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2, path: '/vendor/analytics', notification: 0 },
    { id: 'orders', label: 'Orders', icon: FiShoppingCart, path: '/vendor/orders', notification: 5 },
    { id: 'revenue', label: 'Revenue', icon: FiTrendingUp, path: '/vendor/revenue', notification: 0 },
    { id: 'customers', label: 'Customers', icon: FiUsers, path: '/vendor/customers', notification: 0 },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare, path: '/vendor/messages', notification: 12 },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/vendor/settings', notification: 0 },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    
    if (item.path) {
      router.push(item.path);
    }
    
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative 
        bg-white
        h-screen 
        transition-all duration-300 ease-in-out
        z-40
        flex flex-col
        border-r border-gray-200
        shadow-lg md:shadow-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isOpen ? 'w-64' : 'w-20'}
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-lg font-bold text-gray-800">Seller</h1>
            </div>
          )}
          
          {/* Toggle Button - Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`
                    w-full flex items-center px-3 py-3 
                    transition-all duration-200 
                    rounded-lg
                    group
                    relative
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
                  />
                  
                  {isOpen && (
                    <>
                      <span className="ml-3 font-medium text-sm">{item.label}</span>
                      {item.notification > 0 && (
                        <span className={`ml-auto ${
                          isActive 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-200 text-gray-600'
                        } px-2 py-1 rounded-full text-xs font-medium min-w-6 flex items-center justify-center`}>
                          {item.notification}
                        </span>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isOpen && item.notification > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.notification}
                    </span>
                  )}
                  
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                      {item.notification > 0 && ` (${item.notification})`}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className={`border-t border-gray-200 ${isOpen ? 'p-4' : 'p-3'}`}>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Vendor"
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            />
            
            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      John Vendor
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Premium Seller
                    </p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Logout"
                  >
                    <FiLogOut size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Seller Header Component
const SellerHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    { id: 1, text: 'New order received', time: '5 min ago', unread: true },
    { id: 2, text: 'Product review received', time: '1 hour ago', unread: true },
    { id: 3, text: 'Payment received', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className={`
        bg-white
        border-b border-gray-200
        sticky top-0
        transition-all duration-300
        z-30
        ${isScrolled ? 'shadow-sm' : 'shadow-none'}
      `}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section - Mobile Menu & Search */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {/* Mobile menu handler */}}
            >
              <FiMenu size={20} className="text-gray-600" />
            </button>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <FiSun size={18} className="text-gray-600" /> : <FiMoon size={18} className="text-gray-600" />}
            </button>

            {/* Help */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Help"
            >
              <FiHelpCircle size={18} className="text-gray-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                title="Notifications"
              >
                <FiBell size={18} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">John Vendor</p>
                  <p className="text-xs text-gray-500">Premium Seller</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <FiUser size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2">
                    <FiLogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </header>

      {/* Close dropdowns when clicking outside */}
      {(isNotificationOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default SellerLayout;