import React from 'react'
import { FaStar } from 'react-icons/fa'

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
      comment: "TradeOct made bidding so simple and transparent! I won my first auction within hours."
    },
    {
      name: "Michael Lee",
      role: "Trusted Seller",
      rating: 5,
      comment: "Listing items and managing auctions is effortless. Highly recommend for serious sellers."
    },
    {
      name: "Emma Williams",
      role: "Auction Enthusiast",
      rating: 4,
      comment: "A clean and professional platform for bidding on exclusive items. Very user-friendly!"
    }
  ]

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-20">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 max-w-sm text-center">
            <div className="flex justify-center mb-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500 mx-1" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
            <h3 className="font-semibold">{review.name}</h3>
            <p className="text-gray-500 text-sm">{review.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
