import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import newCurrency from '../../assets/newSymbole.png';

const FeaturedItems = [
  {
    image: "/items/watch1.png",
    name: "Rolex Submariner",
    category: "Watches",
    rating: 4.9,
    price: "12,500"
  },
  {
    image: "/items/leatherbag1.png",
    name: "Luxury Leather Bag",
    category: "Leather Bags",
    rating: 4.7,
    price: "850"
  },
  {
    image: "/items/accessory1.png",
    name: "Gold Chain Necklace",
    category: "Accessories",
    rating: 4.8,
    price: "1,200"
  },
  {
    image: "/items/gold1.png",
    name: "24K Gold Ring",
    category: "Gold",
    rating: 4.9,
    price: "2,300"
  },
  {
    image: "/items/jewelry1.png",
    name: "Diamond Earrings",
    category: "Jewelry",
    rating: 5.0,
    price: "3,500"
  },
];

export default function FeaturedAuctions() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured Auctions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our premium auction items – Watches, Leather Bags, Jewelry, Gold & more
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect={"coverflow"}
          loop={true}
          spaceBetween={30}
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
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          className="pb-16"
        >
          {FeaturedItems.map((item, index) => (
            <SwiperSlide key={index} className="max-w-xs">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="p-6 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 object-contain"
                  />
                </div>
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{item.category}</p>
                  {/* Price with custom currency image */}
                  <p className="text-gray-700 font-semibold mb-2 flex items-center justify-center space-x-1">
                    <img src={newCurrency.src} alt="Currency" className="h-5" />
                    <span>{item.price}</span>
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-700 font-medium">{item.rating}</span>
                  </div>
                  <button className="w-full bg-[#1e518e] hover:bg-[#163b70] text-white font-semibold py-2 rounded-lg transition">
                    Bid Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="item-pagination flex justify-center space-x-2 mt-8"></div>
      </div>
    </section>
  );
}
