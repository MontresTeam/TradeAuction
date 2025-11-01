"use client"
import React, { useState, useEffect } from 'react';
import ImagesOmega from '../../../../public/OmegaNew.jpg'
import Image from 'next/image';
import SimilarProduct from '../SimilarProduct/page';
const ItemDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showBidsPanel, setShowBidsPanel] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock bids data
  const bidsData = [
    { id: 17, bidder: "Bidder 1", amount: 4200, time: "10/31/25, 11:33 AM GMT-5" },
    { id: 16, bidder: "Bidder 6", amount: 4000, time: "10/31/25, 10:55 AM GMT-5" },
    { id: 15, bidder: "Bidder 5", amount: 3800, time: "10/31/25, 10:55 AM GMT-5" },
    { id: 14, bidder: "Bidder 5", amount: 3050, time: "10/27/25, 6:30 PM GMT-5" },
    { id: 13, bidder: "Bidder 2", amount: 2850, time: "10/27/25, 6:30 PM GMT-5" },
    { id: 12, bidder: "Bidder 5", amount: 2450, time: "10/26/25, 2:15 PM GMT-5" },
    { id: 11, bidder: "Bidder 4", amount: 2250, time: "10/26/25, 9:36 AM GMT-5" },
    { id: 10, bidder: "Bidder 2", amount: 2050, time: "10/26/25, 9:01 AM GMT-5" },
  ];

  // Mock product data
  const product = {
    id: "REE.ABS0R3B1-5",
    brand: "Breitling",
    collection: "Premier",
    name: "Breitling Premier Heritage B09 Chronograph 40",
    material: "Steel / Champagne",
    price: 4200,
    endCount: 17,
    bids: 17,
    endDate: new Date('2025-10-31T11:50:00-05:00'),
    images: [
     ImagesOmega,
     ImagesOmega,
     ImagesOmega,
     ImagesOmega,
    ],
    description: "The Breitling Premier Heritage B09 Chronograph 40 combines vintage elegance with modern watchmaking. Featuring a champagne dial, steel case, and sophisticated chronograph functions.",
    features: [
      "40mm Steel Case",
      "Champagne Dial",
      "Chronograph Function",
      "Manual Winding",
      "Sapphire Crystal",
      "Water Resistant to 30m"
    ],
    specifications: {
      "Case Material": "Stainless Steel",
      "Case Diameter": "40mm",
      "Dial Color": "Champagne",
      "Movement": "Manufacture Caliber B09",
      "Power Reserve": "70 hours",
      "Water Resistance": "30m"
    }
  };

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = product.endDate.getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    alert('Bid placed successfully!');
  };

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Bids Side Panel */}
      <div className={`
        fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${showBidsPanel ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Close Button */}
        <button
          onClick={() => setShowBidsPanel(false)}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Bids</h2>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">ENDS ON {product.endDate.toLocaleDateString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: '2-digit' 
              })}, {product.endDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })} GMT-5</p>
              
              {/* Countdown Timer */}
              <div className="bg-red-50 rounded-lg p-4 mt-3">
                <p className="text-sm font-medium text-red-700 mb-2">Ends in</p>
                <div className="flex justify-center space-x-2">
                  <div className="text-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-xl font-bold text-red-600">
                        {formatTimeUnit(timeLeft.days)}
                      </span>
                    </div>
                    <span className="text-xs text-red-600 mt-1 block">Days</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-xl font-bold text-red-600">
                        {formatTimeUnit(timeLeft.hours)}
                      </span>
                    </div>
                    <span className="text-xs text-red-600 mt-1 block">Hours</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-xl font-bold text-red-600">
                        {formatTimeUnit(timeLeft.minutes)}
                      </span>
                    </div>
                    <span className="text-xs text-red-600 mt-1 block">Minutes</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <span className="text-xl font-bold text-red-600">
                        {formatTimeUnit(timeLeft.seconds)}
                      </span>
                    </div>
                    <span className="text-xs text-red-600 mt-1 block">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bids List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Bid Count */}
              <div className="flex justify-between items-center mb-6 p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-700">Bid Count</span>
                <span className="text-2xl font-bold text-blue-600">{product.bids} bids</span>
              </div>

              {/* Bids Table */}
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Placed</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bidsData.map((bid) => (
                      <tr key={bid.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{bid.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{bid.bidder}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">${bid.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{bid.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer with Bid Button */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <button
              onClick={() => setShowBidsPanel(false)}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Place a Bid
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showBidsPanel && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowBidsPanel(false)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-700">WATCHES</a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a href="#" className="text-gray-500 hover:text-gray-700">{product.brand}</a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a href="#" className="text-gray-500 hover:text-gray-700">{product.collection}</a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <Image 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="text-sm text-gray-500 font-mono">
                {product.id}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.brand} {product.collection}
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-700 mb-1">
                  {product.name}
                </h2>
                <p className="text-lg text-gray-600">
                  {product.material}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">CURRENT BID</span>
                  <span className="text-3xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">BID COUNT</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{product.bids} bids</span>
                    <button
                      onClick={() => setShowBidsPanel(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                    >
                      View bids
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Auction ends in</span>
                    <span className="text-lg font-bold text-red-600">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(17 - product.endCount) / 17 * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Bid Form */}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="bidAmount"
                      min={product.price + 100}
                      className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your bid"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">AED</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum bid: ${(product.price + 100).toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                >
                  Place Your Bid
                </button>
              </form>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Watch
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="border-t border-gray-200 mt-8">
            <div className="px-6 md:px-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {['description', 'features', 'specifications', 'bids'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bids' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <button
                      onClick={() => setShowBidsPanel(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Bids
                    </button>
                  </div>
                  <div className="grid gap-4 md:hidden">
                    {bidsData.slice(0, 3).map((bid) => (
                      <div key={bid.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-900">#{bid.id} - {bid.bidder}</span>
                          <span className="font-semibold text-green-600">${bid.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500">{bid.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SimilarProduct/>
    </div>
  );
};

export default ItemDetailsPage;