import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50">
      {/* Background PNG overlay */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      ></div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Bid on Exclusive Items in Real-Time
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
          Join thousands of buyers and sellers, explore rare collectibles, and win auctions with ease.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/auctions"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Start Bidding
          </a>
          <a
            href="/sell"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Sell Your Item
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
