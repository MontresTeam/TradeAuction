'use client'
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

const BannerPage = () => {
  const swiperRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/TMkmLNGw/26425.jpg",
      tag: "OUR VISION",
      title: "DESIGN",
      description: "Credibly leverage existing business experiences through magnetic mindshare. Synergistically exploit efficient partnerships world-class applications.",
      buttonText: "Take A Look"
    },
    {
      id: 2,
      image: "https://i.ibb.co/VWGwrr6B/641.jpg",
      tag: "INSPIRATION",
      title: "MOTION",
      description: "Conveniently formulate progressive users for error-free interfaces. Monotonectally deploy superior relationships without seamless infomediaries.",
      buttonText: "See More"
    },
    {
      id: 3,
      image: "https://i.ibb.co/nsM9MSZZ/129770.jpg",
      tag: null,
      title: "ENGINE",
      description: "Conveniently formulate progressive users for error-free interfaces. Monotonectally deploy superior relationships without seamless infomediaries.",
      buttonText: "Take A Look"
    }
  ];

  return (
    <div className="relative">
  
   
      
    
      {/* Slider Section */}
      <section className="creative-fullpage--slider bg-white z-2 w-full relative flex flex-col h-screen text-base clip-path-none">
        <div className="banner-horizental w-full h-full">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Parallax, Autoplay, Keyboard]}
            direction="horizontal"
            effect="slide"
            parallax={true}
            speed={1600}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              el: '.swiper-pagination',
              type: 'progressbar',
            }}
            className="swiper-container-h w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} className="relative flex justify-center text-left flex-col overflow-hidden">
                <div className="slider-inner bg-black h-screen relative" data-swiper-parallax="100">
                  <img 
                    src={slide.image} 
                    alt="full_screen-image" 
                    className="w-full h-screen object-cover"
                  />
                  <div 
                    className="swiper-content absolute top-[22%] left-12 z-1 md:left-14 lg:left-14"
                    data-swiper-parallax="2000"
                  >
                    <div className="title-area">
                      {slide.tag && (
                        <p className="tag text-white font-black text-2xl mb-2 mt-0">
                          {slide.tag}
                        </p>
                      )}
                      <a href="#" className="title text-white text-6xl md:text-7xl lg:text-8xl xl:text-8vw font-inter font-black leading-tight uppercase mb-12 -ml-3 no-underline">
                        {slide.title}
                      </a>
                    </div>
                    <p className="disc text-xl mt-5 my-5 font-normal leading-8 text-white/70 md:w-full">
                      {slide.description.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    <div className="creative-btn--wrap">
                      <a className="creative-slide--btn text-white ml-4 text-2xl transition-all duration-300 font-normal inline-flex relative whitespace-nowrap no-underline justify-center items-center cursor-pointer user-select-none outline-none hover:ml-9"
                         role="button" 
                         href="#0"
                      >
                        <div className="creative-btn--circle">
                          <div className="circle absolute right-[calc(100%-10px)] top-0 bottom-0 m-auto w-11 h-11 flex items-center justify-center rounded-full clip-path-circle-25 transition-all duration-500 hover:clip-path-circle-50">
                            <div className="circle-fill absolute inset-0 rounded-full bg-white scale-0 transition-all duration-500 z-1 hover:scale-100"></div>
                            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="circle-outline fill-transparent w-2 stroke-white">
                              <circle cx="25" cy="25" r="23"></circle>
                            </svg>
                            <div className="circle-icon absolute inset-0 overflow-hidden flex items-center justify-center opacity-0 -translate-x-full transition-all duration-500 z-2 hover:translate-x-0 hover:opacity-100">
                              <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-arrow w-5 h-5 fill-black">
                                <path d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="creative-btn--label ml-1 transition-transform duration-500 hover:translate-x-4">
                          <div className="creative-btn__text">{slide.buttonText}</div>
                          <div className="creative-btn__border absolute left-1 right-0 bottom-0 h-px bg-current origin-right transition-transform duration-500 hover:scale-x-0"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="slider-inner-overlay absolute w-[101%] h-full top-0 -left-px bg-transparent bg-radial-gradient-at-center-right"></div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div className="swiper-button-wrapper creative-button--wrapper">
              <div className="swiper-button-next absolute bottom-5 top-auto scale-100 transition-all duration-400 bg-transparent backdrop-blur-xl h-20 w-20 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer right-12 z-10"
                   tabIndex={0} 
                   role="button" 
                   aria-label="Next slide"
              >
                <span className="text-white text-6xl font-bold">→</span>
              </div>
              <div className="swiper-button-prev absolute bottom-5 top-auto scale-100 transition-all duration-400 bg-transparent backdrop-blur-xl h-20 w-20 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer left-12 z-10"
                   tabIndex={0} 
                   role="button" 
                   aria-label="Previous slide"
              >
                <span className="text-white text-6xl font-bold">←</span>
              </div>
            </div>

            {/* Pagination */}
            <div className="slider-pagination-area flex items-center justify-center absolute top-auto right-auto bottom-20 left-1/2 -translate-x-1/2 w-80 md:w-[500px] z-1">
              <h5 className="slide-range one absolute -left-12 text-white text-lg font-medium leading-none">01</h5>
              <div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal w-80 md:w-[500px]"></div>
              <h5 className="slide-range three absolute -right-12 text-white text-lg font-medium leading-none">03</h5>
            </div>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default BannerPage;