"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useGlobals } from "@/app/contexts/Globals";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { BsFillPersonFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import Password from "@/app/components/Password";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    windowWidth,
    setIsLoggedIn,
    profilePercentage,
    setProfilePercentage,
    setToastMessage,
    showSideBar,
    sideBarRef,
  } = useGlobals();

  useEffect(() => {
    const profilePercentage = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/user/profilePercentage?userId=${
            token !== null ? jwtDecode(token).sub : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setProfilePercentage(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };

    profilePercentage();
  }, []);

  const navigateToMyAccount = () => {
    router.push("/myAccount");
  };

  const navigateToNotifications = () => {
    router.push("/myAccount/notifications");
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
            <div className="flex justify-center items-center mb-3">
              <div className="bg-blue-100 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
                <BsFillPersonFill className="text-xl text-blue-400" />
              </div>
              <p className="text-center text-gray-600 text-lg sm:text-xl font-bold font-sans">
                My Account
              </p>
            </div>
            <div className="w-[90%] mx-auto h-[0.5rem] rounded-xl bg-white">
              <div
                className={`h-full rounded-xl ${
                  profilePercentage !== 100 ? "rounded-r-none" : ""
                }`}
                style={{
                  backgroundColor: "#1BC4BF",
                  width: `${profilePercentage}%`,
                }}
              ></div>
            </div>
            <p className="text-center text-slate-500 mt-2 text-sm font-sans truncate">
              {profilePercentage !== 0
                ? `Profile ${profilePercentage}% complete`
                : "Profile _% complete"}
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname === "/myAccount"
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateToMyAccount}
          >
            <BsFillPersonFill className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Personal info
            </p>
          </div>
          <div
            className={`flex font-sans text-gray-700 p-3 pt-2 pb-2 md:pt-3 md:pb-3 rounded-full shadow-md shadow-gray-400 ${
              pathname.includes("/myAccount/notifications")
                ? "bg-blue-400"
                : "bg-slate-200 hover:bg-slate-300"
            } m-4 cursor-pointer items-center`}
            onClick={navigateToNotifications}
          >
            <IoNotifications className="text-xl sm:text-2xl mr-2" />
            <p className="font-bold truncate text-sm sm:text-base">
              Notifications
            </p>
          </div>
          <Password />
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
