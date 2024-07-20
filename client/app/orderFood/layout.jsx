"use client";

import React from "react";
import { TbSeparatorVertical } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import FoodBucket from "@/public/FoodBucket.jpg";
import Image from "next/image";
import { FaBowlFood } from "react-icons/fa6";
import { PiStarFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobals } from "../contexts/Globals";
import { IoStatsChart } from "react-icons/io5";
import { useEffect } from "react";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setCartCount, windowWidth, showSideBar, sideBarRef } =
    useGlobals();

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      if (cart.selectedMenu) {
        setCartCount(cart.selectedMenu.length);
      }
    }
  }, []);

  const navigateOrderNow = () => {
    router.push("/orderFood");
  };

  const navigateOrderStatus = () => {
    router.push("/orderFood/orderStatus");
  };

  const navigateSubmitRating = () => {
    router.push("/orderFood/submitRating");
  };

  const navigateCart = () => {
    router.push("/orderFood/cart");
  };

  const navigateChatRoom = () => {
    router.push("/orderFood/chat");
  };

  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto flex"
      style={{
        height:
          windowWidth > 530 ? "calc(100svh - 4rem)" : "calc(100svh - 3.3rem)",
      }}
    >
      {(showSideBar || windowWidth > 900) && (
        <div
          className={`${
            windowWidth > 1200 ? "w-[30%]" : "w-[40%]"
          } max-w-[20rem] h-full max-h-full overflow-y-auto bg-gray-100 shadow-lg shadow-gray-500 min-w-[240px] mr-1 ${
            windowWidth < 900
              ? showSideBar
                ? "absolute top-16 left-0 z-10 sideBarAnimation"
                : "hidden"
              : ""
          }`}
          ref={sideBarRef}
        >
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
              <p className="text-center text-gray-600 text-lg sm:text-xl font-bold font-sans">
                Order Food
              </p>
            </div>
            <div className="mb-2 w-full flex gap-2 justify-center items-center">
              <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
              <TbSeparatorVertical className="h-5 w-5 text-gray-600" />
              <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
            </div>
            <p className="text-center text-gray-600 text-xs sm:text-sm font-bold font-sans">
              Manage your orders here
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/orderFood") &&
              !pathname.includes("/orderFood/orderStatus") &&
              !pathname.includes("/orderFood/submitRating") &&
              !pathname.includes("/orderFood/cart") &&
              !pathname.includes("/orderFood/chat")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateOrderNow}
          >
            <FaBowlFood className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Order Food
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/orderFood/orderStatus")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateOrderStatus}
          >
            <IoStatsChart className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Order Status
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/orderFood/submitRating")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateSubmitRating}
          >
            <PiStarFill className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Give Rating
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/orderFood/cart")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateCart}
          >
            <FaShoppingCart className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/orderFood/chat")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateChatRoom}
          >
            <HiMiniChatBubbleOvalLeftEllipsis className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">Chat Room</p>
          </div>
        </div>
      )}
      <div
        className="overflow-x-hidden overflow-y-auto flex w-full"
        style={{
          height:
            windowWidth > 530 ? "calc(100svh - 4rem)" : "calc(100svh - 3.3rem)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// responsive
