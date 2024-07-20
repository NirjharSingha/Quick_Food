"use client";

import React from "react";
import { TbSeparatorVertical } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MdDeliveryDining } from "react-icons/md";
import { useGlobals } from "../contexts/Globals";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { windowWidth, showSideBar, sideBarRef } = useGlobals();

  const navigateDashboard = () => {
    router.push("/admin");
  };
  const navigateRestaurants = () => {
    router.push("/admin/restaurants");
  };
  const navigateRiders = () => {
    router.push("/admin/riders");
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
              <div className="bg-blue-100 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
                <MdAdminPanelSettings className="text-xl text-blue-400" />
              </div>
              <p className="text-center text-gray-600 text-lg sm:text-xl font-bold font-sans">
                Admin Dashboard
              </p>
            </div>
            <div className="mb-2 w-full flex gap-2 justify-center items-center">
              <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
              <TbSeparatorVertical className="h-5 w-5 text-gray-600" />
              <div className="w-[35%] h-[2px] bg-gray-600 rounded-full" />
            </div>
            <p className="text-center text-gray-600 text-xs sm:text-sm font-bold font-sans">
              Options for the Admin
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 rounded-full shadow-md shadow-gray-400 ${
              pathname === "/admin"
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateDashboard}
          >
            <MdDashboard className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">Dashboard</p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/admin/restaurants")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateRestaurants}
          >
            <SiHomeassistantcommunitystore className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Restaurants
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/admin/riders")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateRiders}
          >
            <MdDeliveryDining className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">Riders</p>
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
