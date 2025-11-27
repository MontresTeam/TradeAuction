"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import seller from '../../../assets/seller_3.jpg'
import Buyer from '../../../assets/20943943.jpg'

const RoleSelection = () => {
  const router = useRouter();

  const roles = [
    {
      title: "Seller",
      description: "List your products, reach thousands of buyers, and grow your business",
      image: seller, // Replace with your seller image path
      path: "/register/seller",
      features: ["List unlimited products", "Manage inventory", "Track sales", "24/7 support"],
      buttonText: "Start Selling"
    },
    {
      title: "Buyer",
      description: "Discover amazing products, bid on auctions, and shop with confidence",
      image: Buyer, // Replace with your buyer image path
      path: "/register/buyer",
      features: ["Secure bidding", "Price alerts", "Wishlist", "Buyer protection"],
      buttonText: "Start Shopping"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Choose how you want to experience our platform
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Whether you're looking to sell your products or find great deals, we've got you covered
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(role.path)}
            >
              {/* Role Image */}
              <div className="h-48 w-full relative">
                <Image
                  src={role.image}
                  alt={role.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h2>
                <p className="text-gray-600 mb-4">{role.description}</p>
                
                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {role.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Not sure which to choose?
            </h3>
            <p className="text-gray-600 mb-6">
              You can always switch between buyer and seller roles later in your account settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/learn-more")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
              >
                Learn More
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;