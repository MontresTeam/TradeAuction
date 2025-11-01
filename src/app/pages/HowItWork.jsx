"use client"
import React, { useState } from 'react';
import { FaUserPlus, FaGavel, FaBell, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
  const [activeMode, setActiveMode] = useState('buy'); // 'buy' or 'sell'

  const buySteps = [
    {
      icon: <FaUserPlus className="text-2xl" />,
      title: "Register",
      description: "Enter your details and verify your payment card to start bidding."
    },
    {
      icon: <FaGavel className="text-2xl" />,
      title: "Bid",
      description: "Apply your desired bid or set an auto-bid with a maximum limit."
    },
    {
      icon: <FaBell className="text-2xl" />,
      title: "LIVE",
      subtitle: "Closing Auction",
      description: "Stay alert on the closing phase so you don't get outbid at the last second."
    },
    {
      icon: <FaTrophy className="text-2xl" />,
      title: "Win",
      description: "Highest bid? You will get an email with the next steps for claiming your item."
    }
  ];

  const sellSteps = [
    {
      icon: <FaUserPlus className="text-2xl" />,
      title: "Register",
      description: "Create your seller account and complete the verification process."
    },
    {
      icon: <FaGavel className="text-2xl" />,
      title: "List Item",
      description: "Upload photos, set starting price, and describe your item for auction."
    },
    {
      icon: <FaBell className="text-2xl" />,
      title: "Monitor",
      subtitle: "Live Bidding",
      description: "Watch your auction progress and track bidding activity in real-time."
    },
    {
      icon: <FaTrophy className="text-2xl" />,
      title: "Sell",
      description: "Item sold? We'll handle payment processing and shipping coordination."
    }
  ];

  const steps = activeMode === 'buy' ? buySteps : sellSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">How It Works</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <button 
            onClick={() => setActiveMode('buy')}
            className={`px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 ${
              activeMode === 'buy' 
                ? 'bg-gradient-to-r from-[#1e518e] to-[#0061b0ee]' 
                : 'bg-gray-200 text-black  border-2 border-gray-400'
            }`}
          >
            BUY WITH US
          </button>
          <button 
            onClick={() => setActiveMode('sell')}
            className={`px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 ${
              activeMode === 'sell' 
                ? 'bg-gradient-to-r from-[#1e518e] to-[#0061b0ee]' 
                : 'bg-gray-200 text-black border-2 border-gray-400'
            }`}
          >
            SELL WITH US
          </button>
        </div>
        <div className="w-24 h-1 mx-auto bg-black"></div>
      </div>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-300"
            >
         
              {/* Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-r border border-black">
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  {step.title}
                </h3>
                {step.subtitle && (
                  <p className="text-sm font-semibold mb-2 text-black">
                    {step.subtitle}
                  </p>
                )}
                <p className="text-black leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line (for desktop) */}
              {index < steps.length - 1 && (
                <>
                  {/* Mobile connector (vertical) */}
                  <div className="md:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-black"></div>
                  {/* Desktop connector (horizontal) */}
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 lg:block bg-black"></div>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress Bar for Mobile */}
        <div className="md:hidden mt-12">
          <div className="flex justify-between items-center px-8">
            {steps.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] border border-black"></div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-12 mt-2 bg-black"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
          <h2 className="text-2xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-black mb-6 max-w-2xl mx-auto">
            {activeMode === 'buy' 
              ? "Join thousands of satisfied customers who have successfully bought items through our auction platform. Start your bidding journey today!"
              : "Reach thousands of potential buyers and get the best price for your items. Start selling with our trusted platform today!"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              {activeMode === 'buy' ? 'Start Bidding' : 'Start Selling'}
            </button>
            <button className="border-2  hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;