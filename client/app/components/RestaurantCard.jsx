import React from "react";
import Image from "next/image";
import Restaurant from "@/public/Restaurant.png";
import { FaStar } from "react-icons/fa";

const RestaurantCard = () => {
  return (
    <div className="w-[26vw] min-w-[18rem] max-w-[22rem] rounded-lg shadow-md bg-base-100 border-2 border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-lg">
      <Image
        placeholder="blur"
        src={Restaurant}
        alt="logo"
        className="bg-gray-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
      />
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        Restaurant Name
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">Location</p>
      <div className="mt-1 flex gap-1 w-[3.7rem] justify-center items-center font-bold text-white bg-green-700 ml-auto rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
        4.5 <FaStar />
      </div>
    </div>
  );
};

export default RestaurantCard;
