"use client";

import React from "react";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGlobals } from "../contexts/Globals";

const DeliveryHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { windowWidth } = useGlobals();

  const navigateDetails = () => {
    router.push("/delivery");
  };

  const navigateStatus = () => {
    router.push("/delivery/orderStatus");
  };

  const navigateMap = () => {
    router.push("/delivery/map");
  };

  return (
    <div
      className={`w-full flex justify-center bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 ${
        windowWidth > 900 ? "rounded-bl-md" : "rounded-bl-none"
      } flex-col`}
    >
      <div className="flex items-center">
        <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
          <Image src={FavIcon} alt="logo" width={30} />
        </div>
        <p
          className={`ml-1 ${
            windowWidth > 500
              ? "text-2xl"
              : windowWidth > 300
              ? "text-lg"
              : "text-base"
          } text-white font-bold`}
        >
          Your Orders To Deliver
        </p>
      </div>
      <ul
        className={`w-full text-gray-300 mt-4 ${
          windowWidth > 500 ? "" : "text-sm"
        } font-sans list-disc pl-4`}
      >
        <li>Get the details of the order you have to deliver. </li>
        <li>
          Update the status of the order accordingly to notify the customer
          about the delivery.
        </li>
        <li>You can also view the location of the customer on the map.</li>
      </ul>
      <div className="w-full flex justify-between mt-4 text-md font-sans font-bold text-white">
        <div
          className={`pl-4 pr-4 pb-1 border-gray-700 my-auto ${
            !pathname.includes("/delivery/map") &&
            !pathname.includes("/delivery/orderStatus")
              ? "border-b-green-600 text-green-600"
              : "hover:border-b-white"
          } cursor-pointer ${
            windowWidth > 500 ? "border-4" : "text-sm border-2"
          }`}
          onClick={navigateDetails}
        >
          Order
          <br />
          Details
        </div>
        <div
          className={`pl-4 pr-4 pb-1 my-auto border-gray-700 ${
            pathname.includes("/delivery/orderStatus")
              ? "border-b-green-600 text-green-600"
              : "hover:border-b-white"
          } cursor-pointer ${
            windowWidth > 500 ? "border-4" : "text-sm border-2"
          }`}
          onClick={navigateStatus}
        >
          Order
          <br />
          Status
        </div>
        <div
          className={`pl-4 pr-4 pb-1 my-auto border-gray-700 ${
            pathname.includes("/delivery/map")
              ? "border-b-green-600 text-green-600"
              : "hover:border-b-white"
          } cursor-pointer ${
            windowWidth > 500 ? "border-4" : "text-sm border-2"
          }`}
          onClick={navigateMap}
        >
          Location
          <br />
          On Map
        </div>
      </div>
    </div>
  );
};

export default DeliveryHeader;

// responsive
