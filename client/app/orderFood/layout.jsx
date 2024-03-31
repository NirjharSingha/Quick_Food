"use client";

import React from "react";
import { TbSeparatorVertical } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import FoodBucket from "@/public/FoodBucket.jpg";
import Image from "next/image";
import { FaBowlFood } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { PiStarFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateOrderNow = () => {
    router.push("/orderFood");
  };

  const navigateCancelOrder = () => {
    router.push("/orderFood/cancelOrder");
  };

  const navigateSubmitRating = () => {
    router.push("/orderFood/submitRating");
  };

  const navigateCart = () => {
    router.push("/orderFood/cart");
  };

  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto flex"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div className="w-[30%] max-w-[20rem] h-full bg-gray-200">
        <div
          className="mx-auto m-4 rounded-lg bg-gray-400 pt-3 pb-3"
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
            <p className="text-center text-white text-xl font-bold font-sans">
              Order Food
            </p>
          </div>
          <div className="mb-2 w-full flex gap-2 justify-center items-center">
            <div className="w-[35%] h-[2px] bg-white rounded-full" />
            <TbSeparatorVertical className="h-5 w-5 text-white" />
            <div className="w-[35%] h-[2px] bg-white rounded-full" />
          </div>
          <p className="text-center text-white text-sm font-bold font-sans">
            Manage your orders here
          </p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            pathname === "/orderFood"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateOrderNow}
        >
          <FaBowlFood className="text-2xl mr-2" />
          <p className="font-bold truncate">Order Now</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            pathname === "/orderFood/cancelOrder"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateCancelOrder}
        >
          <MdCancel className="text-2xl mr-2" />
          <p className="font-bold truncate">Cancel Order</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            pathname === "/orderFood/submitRating"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateSubmitRating}
        >
          <PiStarFill className="text-2xl mr-2" />
          <p className="font-bold truncate">Submit Rating</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            pathname === "/orderFood/cart"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateCart}
        >
          <FaShoppingCart className="text-2xl mr-2" />
          <p className="font-bold truncate">Cart</p>
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
