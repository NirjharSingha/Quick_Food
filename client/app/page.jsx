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
      <div className="bg-orange-50 flex flex-col-reverse md:flex-row items-center justify-around">
        <div className="flex flex-col justify-center items-center">
          <p className="w-full text-center text-gray-700 font-bold font-serif text-4xl sm:text-6xl mb-4">
            Quick Food
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-xl sm:text-3xl">
            From Order to Door
          </p>
          <p className="w-full text-center text-gray-700 font-bold font-serif text-xl sm:text-3xl mb-4">
            in Minutes
          </p>
          <p className="w-full text-center font-serif p-2 pl-4 pr-4 text-gray-700">
            We offer fastest delivery service in the city. We are here to serve
            even outside the city. <br /> We ensure the quality of food and
            service.
          </p>
          <Image
            placeholder="blur"
            src={FoodItems}
            alt="logo"
            className="hidden lg:block"
          />
        </div>
        <Image
          placeholder="blur"
          src={FoodDelivery}
          alt="logo"
          className="w-[90%] md:w-1/2 lg:w-[2/5] xl:w-1/3 2xl:w-[3/10]"
        />
      </div>
      <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-xl sm:text-4xl mt-4">
        How We Serve You
      </p>
      <div
        className="mt-2 p-1 pl-4 pr-4 bg-orange-50 flex h-[37vh] gap-2 md:h-[45vh] md:grid md:grid-cols-3"
        style={{ overflowX: "auto" }}
      >
        <div className="h-full">
          <Image
            src={Service_1}
            alt="logo"
            className="h-[27vh] w-auto m-auto min-w-[200px] md:h-[35vh]"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-sm md:text-lg mt-4">
            Automated Packaging
          </p>
        </div>
        <div className="h-full">
          <Image
            src={Service_3}
            alt="logo"
            className="h-[27vh] w-auto m-auto min-w-[200px] md:h-[35vh]"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-sm md:text-lg mt-4">
            Packed with Love
          </p>
        </div>
        <div className="h-full">
          <Image
            src={Service_2}
            alt="logo"
            className="h-[27vh] w-auto m-auto min-w-[200px] md:h-[35vh]"
            placeholder="blur"
          />
          <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-sm md:text-lg mt-4">
            Serve hot Appetite
          </p>
        </div>
      </div>
      <p className="bg-orange-50 p-4 w-full text-center text-gray-700 font-bold font-serif text-xl sm:text-4xl mt-4">
        Our Trending Items
      </p>
      <div className="carousel carousel-center mt-2 h-[32vh] sm:h-[42vh] p-[0.5vw] ">
        {carouselItems.map((item, index) => (
          <div className="carousel-item" key={index}>
            <Image
              src={item}
              alt="Pizza"
              className="h-[30vh] sm:h-[40vh] w-[48.5vw] lg:w-[32vw] ml-[0.5vw] mr-[0.5vw] rounded-md"
              placeholder="blur"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

// responsive
