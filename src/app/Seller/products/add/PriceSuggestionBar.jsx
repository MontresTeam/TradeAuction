"use client";
import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";

const PriceSuggestionBar = ({ itemPrice = 18170, onSuggestionSubmit }) => {
  const shippingCost = 650;
  const [suggestionAmount, setSuggestionAmount] = useState(15000);

  // Calculate prediction based on suggestion amount
  const getPrediction = (amount) => {
    const percentage = (amount / itemPrice) * 100;
    
    if (percentage >= 96) return { 
      type: 'good', 
      message: 'Good price suggestion',
      className: 'text-green-600 border-green-200 bg-green-50'
    };
    if (percentage >= 93) return { 
      type: 'may-be-rejected', 
      message: 'Price suggestion may be rejected',
      className: 'text-yellow-600 border-yellow-200 bg-yellow-50'
    };
    return { 
      type: 'likely-rejected', 
      message: 'Price suggestion is likely to be rejected',
      className: 'text-red-600 border-red-200 bg-red-50'
    };
  };

  const prediction = getPrediction(suggestionAmount);
  const totalPrice = suggestionAmount + shippingCost;

  // Predefined suggestion amounts from your screenshots
  const quickSuggestions = [15000, 17000, 17500];

  // Handle custom input change
  const handleInputChange = (e) => {
    const value = Math.max(0, Math.min(itemPrice, Number(e.target.value)));
    setSuggestionAmount(value);
  };

  const handleSubmit = () => {
    if (onSuggestionSubmit) {
      onSuggestionSubmit({
        amount: suggestionAmount,
        total: totalPrice,
        prediction: prediction.type
      });
    }
    // Reset to default after submission
    setSuggestionAmount(15000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <span className="text-lg font-medium text-gray-900">9:01</span>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-900">TradeOct Trusted Checkout</h1>
        </div>
        <div className="w-6"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Product Info */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Rolex Oyster Perpetual Date</h2>
          <div className="text-right">
            <div className="text-sm text-gray-600">Item price:</div>
            <div className="text-lg font-semibold text-gray-900">AED {itemPrice.toLocaleString()}</div>
          </div>
        </div>

        {/* Price Suggestion Section */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-2">
            Your price suggestion
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Negotiate the item price
          </p>

          {/* Quick Suggestion Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {quickSuggestions.map((amount) => (
              <button
                key={amount}
                onClick={() => setSuggestionAmount(amount)}
                className={`py-3 px-2 text-sm font-medium rounded-xl border-2 transition-all ${
                  suggestionAmount === amount
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                AED {amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-700 font-medium">AED</span>
              </div>
              <input
                type="number"
                value={suggestionAmount}
                onChange={handleInputChange}
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                max={itemPrice}
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">+ Shipping to: UAE</span>
            <span className="text-sm text-gray-600">AED {shippingCost}</span>
          </div>

          {/* Prediction Message */}
          <div className={`mt-4 p-4 rounded-xl border-2 ${prediction.className}`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                prediction.type === 'good' ? 'bg-green-500' :
                prediction.type === 'may-be-rejected' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${prediction.className.split(' ')[0]}`}>
                {prediction.message}
              </span>
              <FiInfo className={`ml-2 ${prediction.className.split(' ')[0]}`} size={16} />
            </div>
          </div>

          {/* Prediction Note */}
          <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed">
            Predictions are based on statistical data and are not binding as to whether your price suggestion will be accepted or rejected by the seller.
          </p>
        </div>

        {/* Total Price Section */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base font-semibold text-gray-900">Total price</span>
            <span className="text-xs text-gray-500">Incl. shipping, excl. VAT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              AED {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSubmit}
          className="w-full mt-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
        >
          Submit Offer
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center p-4 border-t border-gray-200 bg-gray-50">
        {['Discover', 'Favorites', 'Watch Collection', 'Sell', 'myChrono24'].map((item) => (
          <button
            key={item}
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors font-medium py-1 px-2"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceSuggestionBar;