"use client"
import React, { useState } from 'react';

const UpcomingAuction = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const upcomingAuctions = [
    {
      id: 1,
      title: "Rare Patek Philippe Grandmaster",
      startingBid: 85000,
      estimate: "AED 440,000 - 550,000",
      image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-15",
      time: "14:00 GST",
      category: "watches",
      featured: true,
      items: 1,
      location: "Dubai, UAE"
    },
    {
      id: 2,
      title: "Hermès Birkin 25 Matte Crocodile",
      startingBid: 45000,
      estimate: "AED 220,000 - 295,000",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-16",
      time: "11:00 GST",
      category: "bags",
      featured: true,
      items: 1,
      location: "Dubai, UAE"
    },
    {
      id: 3,
      title: "Vintage Watch Collection",
      startingBid: 25000,
      estimate: "AED 128,000 - 183,000",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-17",
      time: "15:30 GST",
      category: "watches",
      featured: false,
      items: 12,
      location: "Abu Dhabi, UAE"
    },
    {
      id: 4,
      title: "Designer Handbag Auction",
      startingBid: 15000,
      estimate: "AED 92,000 - 147,000",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-18",
      time: "13:00 GST",
      category: "bags",
      featured: false,
      items: 8,
      location: "Dubai, UAE"
    },
    {
      id: 5,
      title: "Diamond & Pearl Jewelry Set",
      startingBid: 18000,
      estimate: "AED 92,000 - 128,000",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-19",
      time: "16:00 GST",
      category: "jewelry",
      featured: true,
      items: 1,
      location: "Dubai, UAE"
    },
    {
      id: 6,
      title: "Luxury Watch & Jewelry Event",
      startingBid: 50000,
      estimate: "AED 275,000 - 367,000",
      image: "https://images.unsplash.com/photo-1599643478510-a349350e6e01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-20",
      time: "10:00 GST",
      category: "watches",
      featured: false,
      items: 25,
      location: "Dubai, UAE"
    },
    {
      id: 7,
      title: "Chanel Vintage Collection",
      startingBid: 32000,
      estimate: "AED 165,000 - 220,000",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-21",
      time: "14:30 GST",
      category: "bags",
      featured: true,
      items: 6,
      location: "Abu Dhabi, UAE"
    },
    {
      id: 8,
      title: "Rare Gemstone Collection",
      startingBid: 75000,
      estimate: "AED 367,000 - 550,000",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-22",
      time: "12:00 GST",
      category: "jewelry",
      featured: false,
      items: 15,
      location: "Dubai, UAE"
    },
    {
      id: 9,
      title: "Rolex Daytona Platinum",
      startingBid: 60000,
      estimate: "AED 275,000 - 330,000",
      image: "https://images.unsplash.com/photo-1508057198453-0fde0bcdf44f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-23",
      time: "15:00 GST",
      category: "watches",
      featured: true,
      items: 1,
      location: "Dubai, UAE"
    },
    {
      id: 10,
      title: "Louis Vuitton Limited Collection",
      startingBid: 20000,
      estimate: "AED 110,000 - 147,000",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-24",
      time: "11:30 GST",
      category: "bags",
      featured: false,
      items: 5,
      location: "Sharjah, UAE"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Auctions' },
    { id: 'watches', name: 'Watches' },
    { id: 'bags', name: 'Brand Bags' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  const dates = [
    { id: 'all', name: 'All Dates' },
    { id: '2024-12-15', name: 'Dec 15' },
    { id: '2024-12-16', name: 'Dec 16' },
    { id: '2024-12-17', name: 'Dec 17' },
    { id: '2024-12-18', name: 'Dec 18' },
    { id: '2024-12-19', name: 'Dec 19' },
    { id: '2024-12-20', name: 'Dec 20' },
    { id: '2024-12-21', name: 'Dec 21' },
    { id: '2024-12-22', name: 'Dec 22' }
  ];

  const filteredAuctions = upcomingAuctions.filter(auction => {
    const categoryMatch = activeFilter === 'all' || auction.category === activeFilter;
    const dateMatch = selectedDate === 'all' || auction.date === selectedDate;
    return categoryMatch && dateMatch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const convertToAED = (usdAmount) => {
    const exchangeRate = 3.67; // USD to AED
    return Math.round(usdAmount * exchangeRate).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Upcoming Auctions
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Mark your calendar for these exclusive luxury auctions in the UAE.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600 mb-1">{upcomingAuctions.length}</div>
              <div className="text-xs text-gray-600 font-medium">Total Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600 mb-1">
                {upcomingAuctions.filter(a => a.featured).length}
              </div>
              <div className="text-xs text-gray-600 font-medium">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600 mb-1">
                {upcomingAuctions.reduce((sum, auction) => sum + auction.items, 0)}
              </div>
              <div className="text-xs text-gray-600 font-medium">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">
                {new Set(upcomingAuctions.map(a => a.location)).size}
              </div>
              <div className="text-xs text-gray-600 font-medium">Locations</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filters */}
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Filter by Category</h3>
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Filters */}
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Filter by Date</h3>
              <div className="flex flex-wrap gap-1">
                {dates.map(date => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedDate === date.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {date.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Auction Grid - Updated for 5 items on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
          {filteredAuctions.map(auction => (
            <div
              key={auction.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 ${
                auction.featured ? 'ring-1 ring-yellow-400' : ''
              }`}
            >
              {/* Featured Badge */}
              {auction.featured && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold z-10">
                  ⭐ Featured
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Upcoming Badge */}
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                  SOON
                </div>

                {/* Date Overlay */}
                <div className="absolute bottom-2 left-2">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 py-1 px-2 rounded text-xs">
                    <div className="font-bold">{formatDate(auction.date)}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight flex-1 pr-1 line-clamp-2">
                    {auction.title}
                  </h3>
                  <div className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-semibold capitalize shrink-0 ml-1">
                    {auction.category}
                  </div>
                </div>

                {/* Location & Items */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <div className="flex items-center space-x-1 truncate">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{auction.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>{auction.items}</span>
                  </div>
                </div>

                {/* Bid Information */}
                <div className="bg-gray-50 rounded-lg p-2 mb-2">
                  <div className="space-y-1">
                    <div>
                      <p className="text-xs text-gray-500">Starting Bid</p>
                      <p className="text-sm font-bold text-gray-900">
                        AED {convertToAED(auction.startingBid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimate</p>
                      <p className="text-xs font-semibold text-blue-600">
                        {auction.estimate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] hover:from-[#1a477a] hover:to-[#005599] text-white py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200">
                    Reminder
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors duration-200 border border-gray-300">
                    Catalog
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAuctions.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No auctions found</h3>
            <p className="text-gray-600 mb-4 text-sm">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => { setActiveFilter('all'); setSelectedDate('all'); }}
              className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}

     

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Auction FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">How do I register for an auction?</h3>
              <p className="text-gray-600 text-xs">
                Click on any auction and select "Register to Bid". You'll need to provide identification and payment details.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Can I preview items before bidding?</h3>
              <p className="text-gray-600 text-xs">
                Yes, most auctions offer preview days where you can inspect items in person at our UAE locations.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">What payment methods are accepted?</h3>
              <p className="text-gray-600 text-xs">
                We accept bank transfers, credit cards, and certified checks in AED. Payment is due within 5 business days.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">How does shipping work in UAE?</h3>
              <p className="text-gray-600 text-xs">
                We offer secure delivery across all Emirates. Shipping costs are calculated based on item size and destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAuction;