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
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setCartCount } = useGlobals();

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
              Order Food
            </p>
          </div>
          <div className="mb-2 w-full flex gap-2 justify-center items-center">
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
            <TbSeparatorVertical className="h-5 w-5 text-gray-600" />
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
          </div>
          <p className="text-center text-gray-600 text-sm font-bold font-sans">
            Manage your orders here
          </p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
            pathname.includes("/orderFood") &&
            !pathname.includes("/orderFood/submitRating") &&
            !pathname.includes("/orderFood/cart")
              ? "bg-blue-400"
              : "bg-slate-200 hover:bg-slate-300"
          } m-4 cursor-pointer items-center`}
          onClick={navigateOrderNow}
        >
          <FaBowlFood className="text-2xl mr-2" />
          <p className="font-bold truncate">Order Now</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
            pathname.includes("/orderFood/submitRating")
              ? "bg-blue-400"
              : "bg-slate-200 hover:bg-slate-300"
          } m-4 cursor-pointer items-center`}
          onClick={navigateSubmitRating}
        >
          <PiStarFill className="text-2xl mr-2" />
          <p className="font-bold truncate">Give Rating</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
            pathname.includes("/orderFood/cart")
              ? "bg-blue-400"
              : "bg-slate-200 hover:bg-slate-300"
          } m-4 cursor-pointer items-center`}
          onClick={navigateCart}
        >
          <FaShoppingCart className="text-2xl mr-2" />
          <p className="font-bold truncate">
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </p>
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
