import React from 'react'
import { FaUserPlus, FaSearch, FaGavel } from 'react-icons/fa' // User, Browse, Bid icons

const HowItWork = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-yellow-500 mx-auto mb-4" />,
      title: "Sign Up & Verify",
      description: "Create your account and verify your identity to start bidding or selling."
    },
    {
      icon: <FaSearch className="text-4xl text-yellow-500 mx-auto mb-4" />,
      title: "Browse or List Items",
      description: "Explore live auctions or list your own items with ease."
    },
    {
      icon: <FaGavel className="text-4xl text-yellow-500 mx-auto mb-4" />,
      title: "Place Bids & Win",
      description: "Participate in auctions, place your bids, and win exclusive items."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="flex flex-col sm:flex-row justify-around text-center gap-8 px-4 sm:px-20">
        {steps.map((step, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 flex-1 hover:scale-105 transform transition duration-300">
            {step.icon}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWork
