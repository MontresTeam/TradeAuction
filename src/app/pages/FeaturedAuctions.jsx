import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import newCurrency from '../../assets/newSymbole.png';
import ImaeNo from '../../assets/616jllf33ZL._AC_UY1000_.jpg'
import Image from "next/image";

const FeaturedItems = [
  {
    image: ImaeNo,
    name: "Rolex Submariner",
    category: "Watches",
    rating: 4.9,
    price: "12,500"
  },
  {
    image: ImaeNo,
    name: "Luxury Leather Bag",
    category: "Leather Bags",
    rating: 4.7,
    price: "850"
  },
  {
    image:ImaeNo,
    name: "Gold Chain Necklace",
    category: "Accessories",
    rating: 4.8,
    price: "1,200"
  },
  {
    image:ImaeNo,
    name: "24K Gold Ring",
    category: "Gold",
    rating: 4.9,
    price: "2,300"
  },
  {
    image: ImaeNo,
    name: "Diamond Earrings",
    category: "Jewelry",
    rating: 5.0,
    price: "3,500"
  },
];

export default function FeaturedAuctions() {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Featured Auctions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Explore our premium auction items – Watches, Leather Bags, Jewelry, Gold & more
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect={"coverflow"}
          loop={true}
          spaceBetween={16}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
            el: ".item-pagination",
            bulletClass: "item-bullet",
            bulletActiveClass: "item-bullet-active",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false,
              }
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 0,
                stretch: 20,
                depth: 50,
                modifier: 1,
                slideShadows: false,
              }
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
              coverflowEffect: {
                rotate: 0,
                stretch: 30,
                depth: 75,
                modifier: 1,
                slideShadows: false,
              }
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              coverflowEffect: {
                rotate: 0,
                stretch: 50,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }
            },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          className="pb-12 md:pb-16"
        >
          {FeaturedItems.map((item, index) => (
            <SwiperSlide key={index} className="max-w-xs w-full">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 w-full mx-auto">
                <div className="p-4 sm:p-6 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={128}
                    className="h-24 sm:h-32 w-auto object-contain"
                    priority={index < 3}
                  />
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">{item.category}</p>
                  {/* Price with custom currency image */}
                  <p className="text-gray-700 font-semibold mb-2 flex items-center justify-center space-x-1">
                    <Image 
                      src={newCurrency} 
                      alt="Currency" 
                      width={20}
                      height={20}
                      className="h-4 sm:h-5 w-auto"
                    />
                    <span className="text-sm sm:text-base">{item.price}</span>
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <FaStar className="text-yellow-400 w-4 h-4" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{item.rating}</span>
                  </div>
                  <button className="w-full bg-[#1e518e] hover:bg-[#163b70] text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl transition text-sm sm:text-base">
                    Bid Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="item-pagination flex justify-center space-x-2 mt-6 md:mt-8">
          <style jsx>{`
            .item-bullet {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #d1d5db;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .item-bullet-active {
              width: 24px;
              border-radius: 6px;
              background-color: #1e518e;
            }
            @media (min-width: 640px) {
              .item-bullet {
                width: 10px;
                height: 10px;
              }
              .item-bullet-active {
                width: 28px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}