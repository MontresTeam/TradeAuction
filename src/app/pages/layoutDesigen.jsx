"use client";
import React from "react";
import Image from "next/image";
import RolexImage from "../../assets/RolexBan.jpg";
import CartierImage from "../../assets/CartierBnann.jpg";
import AudemarsPiguetImage from "../../assets/Audemars PiguetBann.jpg";
import PatekPhilippeImage from "../../assets/PatekPhilippeBann.jpg";

const LayoutDesign = () => {
  const brands = [
    {
      name: "Rolex",
      image: RolexImage,
    },
    {
      name: "Cartier",
      image: CartierImage,
    },
    {
      name: "Audemars Piguet",
      image: AudemarsPiguetImage,
    },
    {
      name: "Patek Philippe",
      image: PatekPhilippeImage,
    },
  ];

  return (
    <div className="text-white p-4 md:p-8">
      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rolex (wide top-left) */}
        <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden">
          <Image
            src={brands[0].image}
            alt={brands[0].name}
            width={800}
            height={400}
            className="w-full h-72 md:h-[400px] object-cover"
          />
        </div>

        {/* Cartier */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={brands[1].image}
            alt={brands[1].name}
            width={600}
            height={400}
            className="w-full h-72 object-cover"
          />
        </div>

        {/* Audemars Piguet */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={brands[2].image}
            alt={brands[2].name}
            width={600}
            height={400}
            className="w-full h-72 object-cover"
          />
        </div>

        {/* Patek Philippe */}
        <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden">
          <Image
            src={brands[3].image}
            alt={brands[3].name}
            width={800}
            height={400}
            className="w-full h-72 md:h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutDesign;
