"use client"
import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';

const WatchesPage = () => {
  const [favorites, setFavorites] = useState(new Set());

  // Sample watch data with AED currency
  const watches = [
    {
      id: 1,
      name: "Rolex Submariner",
      brand: "Rolex",
      price: 33000,
      originalPrice: 36700,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      condition: "Excellent",
      year: 2022,
      features: ["Automatic", "Water Resistant", "Ceramic Bezel"],
    },
    {
      id: 2,
      name: "Omega Speedmaster",
      brand: "Omega",
      price: 20200,
      originalPrice: 23800,
      image: "https://images.unsplash.com/photo-1547996160-81dfd13fa478?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      condition: "Very Good",
      year: 2021,
      features: ["Chronograph", "Moonwatch", "Sapphire Crystal"],
    },
    {
      id: 3,
      name: "Tag Heuer Carrera",
      brand: "Tag Heuer",
      price: 12100,
      originalPrice: 14700,
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      condition: "Good",
      year: 2020,
      features: ["Automatic", "Date Display", "Steel Case"],
    },
    {
      id: 4,
      name: "Seiko Presage",
      brand: "Seiko",
      price: 3300,
      originalPrice: 4400,
      image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 156,
      condition: "New",
      year: 2023,
      features: ["Automatic", "Power Reserve", "Enamel Dial"],
    },
    {
      id: 5,
      name: "Tissot Le Locle",
      brand: "Tissot",
      price: 2570,
      originalPrice: 3300,
      image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 92,
      condition: "Excellent",
      year: 2022,
      features: ["Automatic", "Roman Numerals", "Leather Strap"],
    },
    {
      id: 6,
      name: "Cartier Tank",
      brand: "Cartier",
      price: 16900,
      originalPrice: 19400,
      image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 78,
      condition: "Very Good",
      year: 2021,
      features: ["Quartz", "Square Case", "Art Deco"],
    }
  ];

  const toggleFavorite = (watchId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(watchId)) {
        newFavorites.delete(watchId);
      } else {
        newFavorites.add(watchId);
      }
      return newFavorites;
    });
  };

  const WatchCard = ({ watch }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={watch.image} 
          alt={watch.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button 
            onClick={() => toggleFavorite(watch.id)}
            className="bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
          >
            {favorites.has(watch.id) ? (
              <FaHeart className="text-red-500 text-xs" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xs" />
            )}
          </button>
          <button className="bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110">
            <FaEye className="text-gray-600 text-xs" />
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-3">
        {/* Brand and Name */}
        <div className="mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {watch.brand}
          </span>
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {watch.name}
          </h3>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs font-semibold ml-1">{watch.rating}</span>
          </div>
          <span className="text-gray-500 text-xs">({watch.reviews})</span>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-2">
          {watch.features.slice(0, 1).map((feature, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs"
            >
              {feature}
            </span>
          ))}
          {watch.features.length > 1 && (
            <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs">
              +{watch.features.length - 1} more
            </span>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">AED {watch.price.toLocaleString()}</span>
            {watch.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-1">
                AED {watch.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">{watch.year}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] hover:from-[#1a477a] hover:to-[#005599] text-white py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-1 text-sm">
            <FaShoppingCart className="text-xs" />
            <span>Buy Now</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-semibold transition-colors duration-200 text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-3 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          
            <div className="mt-3 lg:mt-0">
              <div className="text-xs md:text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5">
                Showing <span className="font-semibold text-gray-900">{watches.length}</span> watches
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 py-6">
        {/* Watch Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {watches.map(watch => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] hover:from-[#1a477a] hover:to-[#005599] text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200">
            Load More Watches
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchesPage;