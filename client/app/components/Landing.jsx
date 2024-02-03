import React from "react";
import FoodDelivery from "@/public/Food_Delivery.png";
import Image from "next/image";
import FoodItems from "@/public/FoodItems.png";

const Landing = () => {
  return (
    <div
      className="w-screen bg-green-800"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div className="bg-orange-50 flex items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="w-full text-center text-gray-700 font-bold font-serif text-5xl mb-4">
            Quick Food
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-3xl">
            From Order to Door
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-3xl mb-4">
            in Minutes
          </p>
          <p className="w-full text-center font-serif p-2">
            We offer fastest delivery service in the city. We are here to serve
            even outside the city.We ensure the quality of food and service.
          </p>
          <Image src={FoodItems} alt="logo" className="" />
        </div>
        <Image src={FoodDelivery} alt="logo" className="ml-auto" />
      </div>
    </div>
  );
};

export default Landing;
