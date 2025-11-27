"use client";
import React, { useState } from "react";
import {
  FiDollarSign,
  FiClock,
  FiTruck,
  FiCheck,
  FiX,
  FiInfo,
  FiShoppingCart,
  FiShield,
  FiSettings,
  FiArrowLeft,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { FaGavel } from "react-icons/fa";
import PriceSuggestionBar from "./PriceSuggestionBar";

const SellerPricingSection = ({ onBack, productData }) => {
  const [saleType, setSaleType] = useState("buy-now");
  const [activeTab, setActiveTab] = useState("pricing"); // "pricing" or "offers"
  const [receivedOffers, setReceivedOffers] = useState([]);
  
  const [pricingData, setPricingData] = useState({
    // Buy Now Fields
    buyNowPrice: "18170",
    offerType: "auto-accept",
    autoAcceptPrice: "17000",

    // Auction Fields
    startPrice: "",
    buyNowAuction: "",
    bidIncrement: "10",
    auctionDuration: "7",
    reservePrice: "",

    // Shipping
    shippingPayer: "buyer",
    uaeShipping: "30",
    gccShipping: "80",
    internationalShipping: "",

    // Additional Options
    combineShipping: true,
    inspectionService: false,
    servicingOption: false,

    // Verification
    bidIncreaseVerification: true,
  });

  const [offers, setOffers] = useState([
    { 
      id: 1, 
      amount: 15000, 
      total: 15650,
      buyer: "Ahmed R.", 
      status: "pending",
      prediction: "likely-rejected",
      timestamp: new Date().toISOString()
    },
    { 
      id: 2, 
      amount: 17000, 
      total: 17650,
      buyer: "Sarah M.", 
      status: "pending",
      prediction: "may-be-rejected",
      timestamp: new Date().toISOString()
    },
  ]);

  // Handle price suggestion from buyer
  const handlePriceSuggestion = (suggestion) => {
    const newOffer = {
      id: Date.now(),
      amount: suggestion.amount,
      total: suggestion.total,
      buyer: "New Buyer",
      status: "pending",
      prediction: suggestion.prediction,
      timestamp: new Date().toISOString()
    };
    
    setReceivedOffers(prev => [...prev, newOffer]);
    setOffers(prev => [...prev, newOffer]);
  };

  // Calculate pricing breakdown
  const calculatePricing = (price) => {
    const numericPrice = parseFloat(price) || 0;
    const platformFee = numericPrice * 0.04;
    const sellerEarnings = numericPrice - platformFee;
    const buyerTotal = numericPrice + platformFee;

    return {
      price: numericPrice,
      platformFee,
      sellerEarnings,
      buyerTotal,
    };
  };

  const buyNowBreakdown = calculatePricing(pricingData.buyNowPrice);
  const auctionStartBreakdown = calculatePricing(pricingData.startPrice);
  const auctionBuyNowBreakdown = calculatePricing(pricingData.buyNowAuction);

  const handleInputChange = (field, value) => {
    setPricingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOfferAction = (offerId, action) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId ? { ...offer, status: action } : offer
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine productData and pricingData for final submission
    const finalData = {
      ...productData,
      pricing: pricingData,
      saleType,
      listingDate: new Date().toISOString(),
    };
    console.log("Submitting product:", finalData);
    // Submit to backend
  };

  const bidIncrementOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "double", label: "Double" },
    { value: "triple", label: "Triple" },
  ];

  const durationOptions = [
    { value: "1", label: "24 Hours" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "7 Days" },
  ];

  const offerTypes = [
    {
      value: "auto-accept",
      label: "Auto Accept",
      description: "Automatically accept offers above your minimum price",
    },
    {
      value: "manual-accept",
      label: "Manual Accept",
      description: "Review and manually accept each offer",
    },
    {
      value: "open-offers",
      label: "Open to Offers",
      description: "Accept any reasonable offers",
    },
  ];

  // Pricing Breakdown Card Component
  const PricingBreakdownCard = ({ title, breakdown, showFee = true }) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6">
      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
        <FiDollarSign className="w-5 h-5 mr-2" />
        {title}
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price</span>
          <span className="font-semibold text-gray-800 flex items-center">
            AED {breakdown.price.toFixed(2)}
          </span>
        </div>
        {showFee && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Platform Fee (4%)</span>
              <span className="font-semibold text-red-600 flex items-center">
                -AED {breakdown.platformFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <span className="text-sm font-semibold text-gray-700">
                Seller Net Earnings
              </span>
              <span className="font-bold text-green-600 text-lg flex items-center">
                AED {breakdown.sellerEarnings.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center bg-white rounded-lg p-3 mt-2">
              <span className="text-sm font-semibold text-gray-700">
                Total Buyer Pays
              </span>
              <span className="font-bold text-blue-600 flex items-center">
                AED {breakdown.buyerTotal.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Offer Status Badge
  const OfferStatusBadge = ({ prediction }) => {
    const getStatusConfig = (pred) => {
      switch(pred) {
        case 'good':
          return { color: 'green', text: 'Good Offer' };
        case 'may-be-rejected':
          return { color: 'yellow', text: 'May Reject' };
        case 'likely-rejected':
          return { color: 'red', text: 'Likely Reject' };
        default:
          return { color: 'gray', text: 'Pending' };
      }
    };

    const config = getStatusConfig(prediction);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          <FiArrowLeft className="mr-2" />
          Back to Product Details
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all ${
              activeTab === "pricing"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <FiDollarSign className="inline mr-2" />
            Pricing Setup
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all ${
              activeTab === "offers"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <FiUsers className="inline mr-2" />
            Buyer Offers ({offers.length})
          </button>
        </div>
      </div>

      {/* Pricing Setup Tab */}
      {activeTab === "pricing" && (
        <>
          {/* Sale Type Selection Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiShoppingCart className="mr-3 text-blue-600" />
              Sale Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buy Now Option */}
              <button
                type="button"
                onClick={() => setSaleType("buy-now")}
                className={`p-6 border-2 rounded-xl text-left transition-all ${
                  saleType === "buy-now"
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      saleType === "buy-now"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  />
                  <FiShoppingCart
                    className={`mr-2 ${
                      saleType === "buy-now" ? "text-blue-600" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <span className="font-semibold text-gray-900">Buy Now</span>
                </div>
                <p className="text-sm text-gray-600">
                  Fixed price with optional offer system
                </p>
              </button>

              {/* Auction Option */}
              <button
                type="button"
                onClick={() => setSaleType("auction")}
                className={`p-6 border-2 rounded-xl text-left transition-all ${
                  saleType === "auction"
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      saleType === "auction"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  />
                  <FaGavel
                    className={`mr-2 ${
                      saleType === "auction" ? "text-green-600" : "text-gray-400"
                    }`}
                    size={20}
                  />

                  <span className="font-semibold text-gray-900">Auction</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sell to the highest bidder
                </p>
              </button>
            </div>
          </div>

          {/* Buy Now Section */}
          {saleType === "buy-now" && (
            <div className="space-y-6">
              {/* Buy Now Price Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Buy Now Pricing
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Price Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Buy Now Price *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="number"
                        value={pricingData.buyNowPrice}
                        onChange={(e) =>
                          handleInputChange("buyNowPrice", e.target.value)
                        }
                        className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {/* Offer Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Offer Settings
                    </label>
                    <select
                      value={pricingData.offerType}
                      onChange={(e) =>
                        handleInputChange("offerType", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {offerTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Auto Accept Price */}
                {pricingData.offerType === "auto-accept" && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Accept Minimum Price
                    </label>
                    <div className="relative max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="number"
                        value={pricingData.autoAcceptPrice}
                        onChange={(e) =>
                          handleInputChange("autoAcceptPrice", e.target.value)
                        }
                        className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="800.00"
                        step="0.01"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Offers at or above this price will be automatically accepted
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              {pricingData.buyNowPrice && (
                <PricingBreakdownCard
                  title="Pricing Breakdown"
                  breakdown={buyNowBreakdown}
                />
              )}
            </div>
          )}

          {/* Auction Section */}
          {saleType === "auction" && (
            <div className="space-y-6">
              {/* Auction Pricing Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Auction Settings
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Start Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Start Price *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="number"
                        value={pricingData.startPrice}
                        onChange={(e) =>
                          handleInputChange("startPrice", e.target.value)
                        }
                        className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {/* Buy Now Price (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Buy Now Price (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="number"
                        value={pricingData.buyNowAuction}
                        onChange={(e) =>
                          handleInputChange("buyNowAuction", e.target.value)
                        }
                        className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Bid Increment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Minimum Bid Increment
                    </label>
                    <select
                      value={pricingData.bidIncrement}
                      onChange={(e) =>
                        handleInputChange("bidIncrement", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {bidIncrementOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          AED {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Auction Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Auction Duration
                    </label>
                    <select
                      value={pricingData.auctionDuration}
                      onChange={(e) =>
                        handleInputChange("auctionDuration", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reserve Price */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reserve Price
                  </label>
                  <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">AED</span>
                    </div>
                    <input
                      type="number"
                      value={pricingData.reservePrice}
                      onChange={(e) =>
                        handleInputChange("reservePrice", e.target.value)
                      }
                      className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Hidden minimum price - item won't sell if bids don't reach
                    this amount
                  </p>
                </div>

                {/* Commission Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-800">
                        0% Commission for Seller
                      </h4>
                      <p className="text-sm text-green-600">
                        2% buyer fee (shown to buyer)
                      </p>
                    </div>
                    <FiInfo className="text-green-500" size={20} />
                  </div>
                </div>

                {/* Bid Increase Verification */}
                <div className="mt-4 flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Bid Increase Verification
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get notified when bids increase significantly
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingData.bidIncreaseVerification}
                      onChange={(e) =>
                        handleInputChange(
                          "bidIncreaseVerification",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* Auction Pricing Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pricingData.startPrice && (
                  <PricingBreakdownCard
                    title="Start Price Breakdown"
                    breakdown={auctionStartBreakdown}
                    showFee={false}
                  />
                )}
                {pricingData.buyNowAuction && (
                  <PricingBreakdownCard
                    title="Buy Now Price Breakdown"
                    breakdown={auctionBuyNowBreakdown}
                  />
                )}
              </div>
            </div>
          )}

          {/* Shipping Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiTruck className="mr-3 text-blue-600" />
              Shipping Options
            </h2>

            {/* Shipping Payer Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Who Pays Shipping?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange("shippingPayer", "buyer")}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    pricingData.shippingPayer === "buyer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        pricingData.shippingPayer === "buyer"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="font-semibold text-gray-900">
                      Buyer Pays Shipping
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recommended - buyer covers shipping costs
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange("shippingPayer", "seller")}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    pricingData.shippingPayer === "seller"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        pricingData.shippingPayer === "seller"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="font-semibold text-gray-900">
                      Seller Offers Shipping
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You cover shipping costs
                  </p>
                </button>
              </div>
            </div>

            {/* Shipping Costs - Only show if seller pays */}
            {pricingData.shippingPayer === "seller" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UAE Shipping
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">AED</span>
                    </div>
                    <input
                      type="number"
                      value={pricingData.uaeShipping}
                      onChange={(e) =>
                        handleInputChange("uaeShipping", e.target.value)
                      }
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GCC Shipping
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">AED</span>
                    </div>
                    <input
                      type="number"
                      value={pricingData.gccShipping}
                      onChange={(e) =>
                        handleInputChange("gccShipping", e.target.value)
                      }
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="80"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    International (DHL)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">AED</span>
                    </div>
                    <input
                      type="number"
                      value={pricingData.internationalShipping}
                      onChange={(e) =>
                        handleInputChange("internationalShipping", e.target.value)
                      }
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Auto-calculated"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Combined Shipping */}
            <div className="mt-6 flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-800">Combine Shipping</h4>
                <p className="text-sm text-gray-600">
                  Allow buyers to combine multiple items from you with single
                  shipping fee
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <p>• UAE: Single shipping fee applies</p>
                  <p>• 20 days free storage for combined orders</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingData.combineShipping}
                  onChange={(e) =>
                    handleInputChange("combineShipping", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          {/* Extra Services Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiSettings className="mr-3 text-blue-600" />
              Additional Services
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FiShield className="mr-3 text-green-500" size={20} />
                  <div>
                    <span className="block font-semibold text-gray-800">
                      Inspection Service
                    </span>
                    <span className="text-sm text-gray-600">
                      Professional authentication and condition check
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pricingData.inspectionService}
                  onChange={(e) =>
                    handleInputChange("inspectionService", e.target.checked)
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FiSettings className="mr-3 text-blue-500" size={20} />
                  <div>
                    <span className="block font-semibold text-gray-800">
                      Servicing Option
                    </span>
                    <span className="text-sm text-gray-600">
                      Professional watch servicing before delivery
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pricingData.servicingOption}
                  onChange={(e) =>
                    handleInputChange("servicingOption", e.target.checked)
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Back to Product Details
              </button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Buyer Offers Tab */}
      {activeTab === "offers" && (
        <div className="space-y-6">
          {/* Price Suggestion Bar - Exactly like Chrono24 */}
          <PriceSuggestionBar 
            itemPrice={parseFloat(pricingData.buyNowPrice) || 18170}
            onSuggestionSubmit={handlePriceSuggestion}
          />

          {/* Received Offers Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiUsers className="mr-3 text-green-600" />
              Received Offers ({offers.length})
            </h2>

            {offers.length === 0 ? (
              <div className="text-center py-12">
                <FiUsers className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers yet</h3>
                <p className="text-gray-600">Offers from buyers will appear here once they start making price suggestions.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">
                          {offer.buyer}
                        </p>
                        <OfferStatusBadge prediction={offer.prediction} />
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        AED {offer.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: AED {offer.total.toLocaleString()} (incl. shipping)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(offer.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleOfferAction(offer.id, "accepted")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                      >
                        <FiCheck className="mr-2" size={16} />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleOfferAction(offer.id, "rejected")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                      >
                        <FiX className="mr-2" size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPricingSection;