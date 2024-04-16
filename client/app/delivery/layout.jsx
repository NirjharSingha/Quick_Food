"use client";

import React from "react";
import { TbSeparatorVertical } from "react-icons/tb";
import { useRouter } from "next/navigation";
import FoodBucket from "@/public/FoodBucket.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdDeliveryDining } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateDelivery = () => {
    router.push("/delivery");
  };

  const navigateAnalytics = () => {
    router.push("/delivery/analytics");
  };

  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto flex"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div className="w-[30%] max-w-[20rem] h-full bg-gray-100 shadow-lg shadow-gray-500 mr-1">
        <div
          className="mx-auto m-4 rounded-lg bg-gray-300 shadow-md shadow-gray-400 pt-3 pb-3"
          style={{ width: "calc(100% - 2rem)" }}
        >
          <div className="flex justify-center items-center mb-2">
            <Image
              src={FoodBucket}
              width={36.8}
              height={36.8}
              alt="logo"
              className="mr-2 rounded-full border-2 border-solid border-white"
            />
            <p className="text-center text-gray-600 text-xl font-bold font-sans">
              Delivery Service
            </p>
          </div>
          <div className="mb-2 w-full flex gap-2 justify-center items-center">
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
            <TbSeparatorVertical className="h-5 w-5 text-gray-600" />
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
          </div>
          <p className="text-center text-gray-600 text-sm font-bold font-sans">
            Delivery info for Rider
          </p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
            pathname.includes("/delivery") &&
            !pathname.includes("/delivery/analytics")
              ? "bg-blue-400"
              : "bg-slate-200 hover:bg-slate-300"
          } m-4 cursor-pointer items-center`}
          onClick={navigateDelivery}
        >
          <MdDeliveryDining className="text-2xl mr-2" />
          <p className="font-bold truncate">Your Delivery</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
            pathname.includes("/delivery/analytics")
              ? "bg-blue-400"
              : "bg-slate-200 hover:bg-slate-300"
          } m-4 cursor-pointer items-center`}
          onClick={navigateAnalytics}
        >
          <IoMdAnalytics className="text-xl mr-2" />
          <p className="font-bold truncate">Performance Analytics</p>
        </div>
      </div>
      <div
        className="overflow-x-hidden overflow-y-auto flex w-full"
        style={{ height: "calc(100svh - 4rem)" }}
      >
        {children}
      </div>
    </div>
  );
}
