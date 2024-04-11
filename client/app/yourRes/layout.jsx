"use client";

import React from "react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbSeparatorVertical } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BiSolidFoodMenu } from "react-icons/bi";
import MenuDialog from "../components/MenuDialog";
import { MdPending } from "react-icons/md";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateYourRestaurants = () => {
    router.push("/yourRes");
  };

  const navigateAddNewRestaurant = () => {
    router.push("/yourRes/addNewRes");
  };

  const navigateResById = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const url = "/yourRes/" + restaurantId;
    router.push(url);
  };

  const navigateMenu = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const url = "/yourRes/" + restaurantId + "/menu";
    router.push(url);
  };

  const navigatePendingOrders = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const url = "/yourRes/" + restaurantId + "/pendingOrders";
    router.push(url);
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
            <div className="bg-blue-100 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
              <SiHomeassistantcommunitystore className="text-xl text-blue-400" />
            </div>
            <p className="text-center text-gray-600 text-xl font-bold font-sans">
              Restaurants
            </p>
          </div>
          <div className="mb-2 w-full flex gap-2 justify-center items-center">
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
            <TbSeparatorVertical className="h-5 w-5 text-gray-600" />
            <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
          </div>
          <p className="text-center text-gray-600 text-sm font-bold font-sans">
            Manage your restaurants here
          </p>
        </div>
        {pathname === "/yourRes" || pathname === "/yourRes/addNewRes" ? (
          <>
            <div
              className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
                pathname === "/yourRes"
                  ? "bg-blue-400"
                  : "bg-slate-200 hover:bg-slate-300"
              } m-4 cursor-pointer items-center`}
              onClick={navigateYourRestaurants}
            >
              <FaHome className="text-2xl mr-2" />
              <p className="font-bold truncate">Your Restaurants</p>
            </div>
            <div
              className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
                pathname === "/yourRes/addNewRes"
                  ? "bg-blue-400"
                  : "bg-slate-200 hover:bg-slate-300"
              } m-4 cursor-pointer items-center`}
              onClick={navigateAddNewRestaurant}
            >
              <IoMdAddCircle className="text-2xl mr-2" />
              <p className="font-bold truncate">Add New Restaurant</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
                pathname !== "/yourRes" &&
                pathname !== "/yourRes/addNewRes" &&
                !pathname.includes("/menu") &&
                !pathname.includes("/pendingOrders")
                  ? "bg-blue-400"
                  : "bg-slate-200 hover:bg-slate-300"
              } m-4 cursor-pointer items-center`}
              onClick={navigateResById}
            >
              <FaHome className="text-2xl mr-2" />
              <p className="font-bold truncate">Restaurant Info</p>
            </div>
            <div
              className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
                pathname.includes("/menu")
                  ? "bg-blue-400"
                  : "bg-slate-200 hover:bg-slate-300"
              } m-4 cursor-pointer items-center`}
              onClick={navigateMenu}
            >
              <BiSolidFoodMenu className="text-2xl mr-2" />
              <p className="font-bold truncate">Menu Items</p>
            </div>
            <MenuDialog isAdd={true} menu={{}} />
            <div
              className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
                pathname.includes("/pendingOrders")
                  ? "bg-blue-400"
                  : "bg-slate-200 hover:bg-slate-300"
              } m-4 cursor-pointer items-center`}
              onClick={navigatePendingOrders}
            >
              <MdPending className="text-2xl mr-2" />
              <p className="font-bold truncate">Pending Orders</p>
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
