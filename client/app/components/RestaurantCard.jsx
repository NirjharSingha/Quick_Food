"use client";

import React from "react";
import Image from "next/image";
import Restaurant from "@/public/Restaurant.jpeg";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const RestaurantCard = ({ restaurant }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = () => {
    if (pathname.includes("/yourRes")) {
      router.push(`/yourRes/${restaurant.id}`);
    } else if (pathname.includes("/orderFood")) {
      router.push(`/orderFood/${restaurant.id}`);
    }
  };

  return (
    <div
      className="w-[26vw] min-w-[18rem] max-w-[22rem] h-[16.8rem] rounded-lg shadow-md bg-base-100 border-2 border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-lg"
      onClick={handleNavigate}
    >
      {restaurant.image ? (
        <img
          src={`data:image/jpeg;base64,${restaurant.image}`}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      ) : (
        <Image
          placeholder="blur"
          src={Restaurant}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      )}
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        {restaurant.name}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        {restaurant.address ? restaurant.address : "No Address"}
      </p>
      <div className="mt-1 flex gap-1 w-[3.7rem] justify-center items-center font-bold text-white bg-green-700 ml-auto rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
        4.5 <FaStar />
      </div>
    </div>
  );
};

export default RestaurantCard;
