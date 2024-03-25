"use client";

import React from "react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbSeparatorVertical } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BiSolidFoodMenu } from "react-icons/bi";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateYourRestaurants = () => {
    router.push("/yourRes");
  };

  const navigateAddNewRestaurant = () => {
    router.push("/yourRes/addNewRes");
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
            <div className="bg-blue-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
              <SiHomeassistantcommunitystore className="text-xl text-blue-400" />
            </div>
            <p className="text-center text-white text-xl font-bold font-sans">
              Restaurants
            </p>
          </div>
          <div className="mb-2 w-full flex gap-2 justify-center items-center">
            <div className="w-[35%] h-[2px] bg-white rounded-full" />
            <TbSeparatorVertical className="h-5 w-5 text-white" />
            <div className="w-[35%] h-[2px] bg-white rounded-full" />
          </div>
          <p className="text-center text-white text-sm font-bold font-sans">
            Manage your restaurants here
          </p>
        </div>
        {pathname === "/yourRes" || pathname === "/yourRes/addNewRes" ? (
          <>
            <div
              className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
              onClick={navigateYourRestaurants}
            >
              <FaHome className="text-2xl mr-2" />
              <p className="font-bold truncate">Your Restaurants</p>
            </div>
            <div
              className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
              onClick={navigateAddNewRestaurant}
            >
              <IoMdAddCircle className="text-2xl mr-2" />
              <p className="font-bold truncate">Add New Restaurant</p>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
              onClick={navigateYourRestaurants}
            >
              <FaHome className="text-2xl mr-2" />
              <p className="font-bold truncate">Restaurant Info</p>
            </div>
            <div
              className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
              onClick={navigateYourRestaurants}
            >
              <BiSolidFoodMenu className="text-2xl mr-2" />
              <p className="font-bold truncate">Menu Items</p>
            </div>
            <div
              className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
              onClick={navigateYourRestaurants}
            >
              <IoMdAddCircle className="text-2xl mr-2" />
              <p className="font-bold truncate">Add New Menu</p>
            </div>
          </>
        )}
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
