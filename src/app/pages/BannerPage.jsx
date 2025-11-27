"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import auctionWatche from "../../assets/auctionwathces.jpeg";
import accesriose from '../../assets/accesries.jpeg';
import Image from "next/image";
import { FiZap, FiShield, FiAward, FiTruck } from 'react-icons/fi';

const BannerPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  const slides = [
    {
      id: 1,
      image: auctionWatche,
      tag: "PREMIUM AUCTIONS",
      title: "BID & WIN",
      description: "Discover exclusive items from luxury watches to rare collectibles. Participate in real-time bidding and secure your dream possessions at competitive prices.",
      buttonText: "View Auctions",
    },
    {
      id: 2,
      image: accesriose,
      tag: "LIVE BIDDING",
      title: "AUCTION NOW",
      description: "Join our live auction events featuring art, antiques, and luxury goods. Experience the thrill of competitive bidding with real-time updates.",
      buttonText: "Join Live",
    },
    {
      id: 3,
      image: "https://i.ibb.co/nsM9MSZZ/129770.jpg",
      tag: "REGISTER NOW",
      title: "GET APPROVED",
      description: "Become a registered bidder to access premium auctions. Complete verification and start bidding on exclusive items with secure payment options.",
      buttonText: "Register Today",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const features = [
    { 
      icon: <FiZap className="w-6 h-6" />, 
      label: 'Live Bidding', 
      color: 'bg-gray-900/80 hover:bg-gray-900' 
    },
    { 
      icon: <FiShield className="w-6 h-6" />, 
      label: 'Secure Payments', 
      color: 'bg-gray-900/80 hover:bg-gray-900' 
    },
    { 
      icon: <FiAward className="w-6 h-6" />, 
      label: 'Premium Items', 
      color: 'bg-gray-900/80 hover:bg-gray-900' 
    },
    { 
      icon: <FiTruck className="w-6 h-6" />, 
      label: 'Fast Shipping', 
      color: 'bg-gray-900/80 hover:bg-gray-900' 
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
            className="absolute w-full h-full"
          >
            <div className="absolute inset-0">
              <Image
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Tag */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white font-black text-2xl mb-4 tracking-widest"
                >
                  {slides[currentSlide].tag}
                </motion.p>
                
                {/* Main Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight uppercase"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>
                
                {/* Animated Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <a
                    className="creative-slide--btn text-white ml-4 text-2xl transition-all duration-300 font-normal inline-flex relative whitespace-nowrap no-underline justify-center items-center cursor-pointer user-select-none outline-none hover:ml-9 group"
                    role="button"
                    href="#0"
                  >
                    <div className="creative-btn--circle">
                      <div className="circle absolute right-[calc(100%-10px)] top-0 bottom-0 m-auto w-11 h-11 flex items-center justify-center rounded-full clip-path-circle-25 transition-all duration-500 group-hover:clip-path-circle-50">
                        <div className="circle-fill absolute inset-0 rounded-full bg-white scale-0 transition-all duration-500 z-1 group-hover:scale-100"></div>
                        <svg
                          viewBox="0 0 50 50"
                          xmlns="http://www.w3.org/2000/svg"
                          className="circle-outline fill-transparent w-2 stroke-white"
                        >
                          <circle cx="25" cy="25" r="23"></circle>
                        </svg>
                        <div className="circle-icon absolute inset-0 overflow-hidden flex items-center justify-center opacity-0 -translate-x-full transition-all duration-500 z-2 group-hover:translate-x-0 group-hover:opacity-100">
                          <svg
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-arrow w-5 h-5 fill-black"
                          >
                            <path d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="creative-btn--label ml-1 transition-transform duration-500 group-hover:translate-x-4">
                      <div className="creative-btn__text">
                        {slides[currentSlide].buttonText}
                      </div>
                      <div className="creative-btn__border absolute left-1 right-0 bottom-0 h-px bg-current origin-right transition-transform duration-500 group-hover:scale-x-0"></div>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg 
            className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          aria-label="Next slide"
        >
          <svg 
            className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Bar Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-8">
          <span className="text-white text-lg font-medium">
            {(currentSlide + 1).toString().padStart(2, '0')}
          </span>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-red-600 w-8' 
                    : 'bg-white/50 w-3 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <span className="text-white text-lg font-medium">
            {slides.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Floating Auction Features with React Icons */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className={`${item.color} p-4 rounded-xl shadow-lg text-white text-center hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 cursor-pointer group`}
            >
              <div className="flex justify-center mb-2">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>
              <div className="font-semibold text-sm md:text-base text-white/90">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerPage;