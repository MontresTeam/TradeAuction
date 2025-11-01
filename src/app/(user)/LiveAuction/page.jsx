"use client"
import React, { useState, useEffect } from 'react';

const LiveAuction = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  const auctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      currentBid: 2450,
      startingBid: 1200,
      bidCount: 42,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T23:59:59",
      category: "watches",
      featured: true
    },
    {
      id: 2,
      title: "Cartier Tank Watch",
      currentBid: 3200,
      startingBid: 1800,
      bidCount: 28,
      image: "https://images.unsplash.com/photo-1547996160-81dfd58739ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T20:30:00",
      category: "watches",
      featured: false
    },
    {
      id: 3,
      title: "Chanel Classic Flap Bag",
      currentBid: 6500,
      startingBid: 4200,
      bidCount: 35,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T18:45:00",
      category: "bags",
      featured: true
    },
    {
      id: 4,
      title: "Hermès Birkin 30",
      currentBid: 18500,
      startingBid: 12000,
      bidCount: 22,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T22:15:00",
      category: "bags",
      featured: false
    },
    {
      id: 5,
      title: "Diamond Tennis Bracelet",
      currentBid: 8900,
      startingBid: 5500,
      bidCount: 31,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T19:20:00",
      category: "jewelry",
      featured: true
    },
    {
      id: 6,
      title: "Pearl & Gold Necklace",
      currentBid: 3200,
      startingBid: 1800,
      bidCount: 18,
      image: "https://images.unsplash.com/photo-1599643478510-a349350e6e01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T21:10:00",
      category: "jewelry",
      featured: false
    },
    {
      id: 7,
      title: "Patek Philippe Nautilus",
      currentBid: 45200,
      startingBid: 35000,
      bidCount: 15,
      image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T23:30:00",
      category: "watches",
      featured: true
    },
    {
      id: 8,
      title: "Louis Vuitton Neverfull",
      currentBid: 2200,
      startingBid: 1400,
      bidCount: 27,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T20:00:00",
      category: "bags",
      featured: false
    },
    {
      id: 9,
      title: "Audemars Piguet Royal Oak",
      currentBid: 38500,
      startingBid: 28000,
      bidCount: 19,
      image: "https://images.unsplash.com/photo-1609588041311-aa9c516e7b6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T23:15:00",
      category: "watches",
      featured: true
    },
    {
      id: 10,
      title: "Dior Saddle Bag",
      currentBid: 2800,
      startingBid: 1600,
      bidCount: 24,
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      timeEnd: "2024-12-31T21:45:00",
      category: "bags",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'watches', name: 'Watches' },
    { id: 'bags', name: 'Brand Bags' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  // Initialize with dummy countdown times
  const initialTimes = {
    1: { hours: 12, minutes: 34, seconds: 56 },
    2: { hours: 8, minutes: 15, seconds: 22 },
    3: { hours: 6, minutes: 45, seconds: 18 },
    4: { hours: 10, minutes: 28, seconds: 43 },
    5: { hours: 7, minutes: 12, seconds: 5 },
    6: { hours: 9, minutes: 5, seconds: 37 },
    7: { hours: 13, minutes: 20, seconds: 14 },
    8: { hours: 5, minutes: 48, seconds: 29 },
    9: { hours: 11, minutes: 55, seconds: 8 },
    10: { hours: 8, minutes: 32, seconds: 51 }
  };

  const [dummyTimes, setDummyTimes] = useState(initialTimes);

  useEffect(() => {
    const timer = setInterval(() => {
      setDummyTimes(prevTimes => {
        const newTimes = { ...prevTimes };
        Object.keys(newTimes).forEach(id => {
          const time = newTimes[id];
          let { hours, minutes, seconds } = time;
          
          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                // Reset to initial value when time runs out
                hours = Math.floor(Math.random() * 12) + 1;
                minutes = Math.floor(Math.random() * 60);
                seconds = Math.floor(Math.random() * 60);
              }
            }
          }
          
          newTimes[id] = { hours, minutes, seconds };
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredAuctions = activeFilter === 'all' 
    ? auctions 
    : auctions.filter(auction => auction.category === activeFilter);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Exclusive Live Auctions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover luxury watches, designer bags, and exquisite jewelry. Bid now to own timeless pieces.
          </p>
        </div>

        {/* Live Status Bar */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-2xl mb-8 shadow-lg">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-lg">LIVE AUCTIONS ACTIVE</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-red-100">•</span>
              <span className="ml-2 text-red-100">{auctions.length} items ending soon</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Auction Grid - 2 items on mobile, 5 items on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {filteredAuctions.map(auction => (
            <div
              key={auction.id}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 ${
                auction.featured ? 'ring-1 sm:ring-2 ring-yellow-400 ring-opacity-50' : ''
              }`}
            >
              {/* Featured Badge */}
              {auction.featured && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md">
                  ⭐
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Live Badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold flex items-center space-x-1 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">LIVE</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-sm leading-tight h-8 sm:h-10">
                  {auction.title}
                </h3>

                {/* Timer Section - Moved below item name */}
                <div className="mb-2 sm:mb-3">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-2 px-3 rounded-lg sm:rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-300">Ends in:</span>
                      <span className="font-mono font-bold text-red-400 text-sm">
                        {dummyTimes[auction.id] ? (
                          `${formatTime(dummyTimes[auction.id].hours)}:${formatTime(dummyTimes[auction.id].minutes)}:${formatTime(dummyTimes[auction.id].seconds)}`
                        ) : (
                          '00:00:00'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                        AED{auction.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Start</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-600">
                        AED{auction.startingBid.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="hidden sm:inline">👤</span>
                      <span>{auction.bidCount} bids</span>
                    </div>
                    <div className="capitalize font-medium bg-gray-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                      {auction.category}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((auction.currentBid / auction.startingBid) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-500 shadow-sm"
                      style={{ 
                        width: `${Math.min((auction.currentBid / auction.startingBid) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] hover:from-[#1a477a] hover:to-[#005599] text-white py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 transform hover:scale-105 shadow-md">
                    Place Bid
                  </button>
                  <button className="w-8 sm:w-10 md:w-12 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Auction Insights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">{auctions.length}</div>
              <div className="text-sm text-gray-600 font-medium">Active Auctions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {auctions.reduce((sum, auction) => sum + auction.bidCount, 0)}
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Bids</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${auctions.reduce((sum, auction) => sum + auction.currentBid, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Value</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {auctions.filter(a => a.featured).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Featured Items</div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">How Auction Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <span className="text-lg sm:text-xl font-bold">1</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Register & Browse</h3>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">Create your account and explore exclusive luxury items</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <span className="text-lg sm:text-xl font-bold">2</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Place Your Bid</h3>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">Bid on items you love and track auction progress in real-time</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <span className="text-lg sm:text-xl font-bold">3</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Win & Collect</h3>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">Secure your winning bid and receive your luxury item</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] hover:from-[#1a477a] hover:to-[#005599] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join Live Auction Now
          </button>
          <p className="text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm">
            Don't miss your chance to own exclusive luxury items
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveAuction;