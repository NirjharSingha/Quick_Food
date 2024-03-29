import React from "react";
import FoodDelivery from "@/public/Food_Delivery.png";
import Image from "next/image";
import FoodItems from "@/public/FoodItems.png";
import CarouselItem1 from "@/public/CarouselItem1.jpg";
import CarouselItem2 from "@/public/CarouselItem2.jpg";
import CarouselItem3 from "@/public/CarouselItem3.jpg";
import CarouselItem4 from "@/public/CarouselItem4.jpg";
import CarouselItem5 from "@/public/CarouselItem5.jpg";
import CarouselItem6 from "@/public/CarouselItem6.jpg";
import CarouselItem7 from "@/public/CarouselItem7.jpg";
import CarouselItem8 from "@/public/CarouselItem8.jpg";
import CarouselItem9 from "@/public/CarouselItem9.jpg";
import CarouselItem10 from "@/public/CarouselItem10.jpg";
import CarouselItem11 from "@/public/CarouselItem11.jpg";
import CarouselItem12 from "@/public/CarouselItem12.jpg";
import CarouselItem13 from "@/public/CarouselItem13.jpg";
import CarouselItem14 from "@/public/CarouselItem14.jpg";
import CarouselItem15 from "@/public/CarouselItem15.jpg";
import CarouselItem16 from "@/public/CarouselItem16.jpg";
import Service_1 from "@/public/Service_1.png";
import Service_3 from "@/public/Service_3.png";
import Service_2 from "@/public/Service_2.png";
import Footer from "./components/Footer";

export default function Home() {
  const carouselItems = [
    CarouselItem1,
    CarouselItem2,
    CarouselItem3,
    CarouselItem4,
    CarouselItem5,
    CarouselItem6,
    CarouselItem7,
    CarouselItem8,
    CarouselItem9,
    CarouselItem10,
    CarouselItem11,
    CarouselItem12,
    CarouselItem13,
    CarouselItem14,
    CarouselItem15,
    CarouselItem16,
  ];

  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto bg-orange-50"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div className="bg-orange-50 flex items-center justify-around">
        <div className="flex flex-col justify-center items-center">
          <p className="w-full text-center text-gray-700 font-bold font-serif text-6xl mb-4">
            Quick Food
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-3xl">
            From Order to Door
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-3xl mb-4">
            in Minutes
          </p>
          <p className="w-full text-center font-serif p-2 pl-4 pr-4 text-gray-700">
            We offer fastest delivery service in the city. We are here to serve
            even outside the city. <br /> We ensure the quality of food and
            service.
          </p>
          <Image placeholder="blur" src={FoodItems} alt="logo" className="" />
        </div>
        <Image placeholder="blur" src={FoodDelivery} alt="logo" className="" />
      </div>
      <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-4xl mt-4">
        How We Serve You
      </p>
      <div className="mt-2 p-1 pl-4 pr-4 bg-orange-50 grid grid-cols-3 h-[45vh] overflow-hidden gap-2">
        <div className="w-full h-full">
          <Image
            src={Service_1}
            alt="logo"
            className="h-[35vh] w-auto m-auto"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-lg mt-4">
            Automated Packaging
          </p>
        </div>
        <div className="w-full h-full">
          <Image
            src={Service_3}
            alt="logo"
            className="h-[35vh] w-auto m-auto"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-lg mt-4">
            Packed with Love
          </p>
        </div>
        <div className="w-full h-full">
          <Image
            src={Service_2}
            alt="logo"
            className="h-[35vh] w-auto m-auto"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-lg mt-4">
            Serve hot Appetite
          </p>
        </div>
      </div>
      <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-4xl mt-4">
        Our Trending Items
      </p>
      <div className="carousel carousel-center mt-2 h-[42vh] p-[0.5vw] ">
        {carouselItems.map((item, index) => (
          <div className="carousel-item" key={index}>
            <Image
              src={item}
              alt="Pizza"
              className="h-[40vh] w-[32vw] ml-[0.5vw] mr-[0.5vw]"
              placeholder="blur"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
