"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobals } from "@/app/contexts/Globals";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { BsFillPersonFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import Password from "@/app/components/Password";

export default function RootLayout({ children }) {
  const router = useRouter();
  const {
    setIsLoggedIn,
    profilePercentage,
    setProfilePercentage,
    setToastMessage,
  } = useGlobals();
  const [selected, setSelected] = useState("Personal info");

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
    setSelected("Personal info");
  };

  const navigateToNotifications = () => {
    router.push("/myAccount/notifications");
    setSelected("Notifications");
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
          <div className="flex justify-center items-center mb-3">
            <div className="bg-blue-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
              <BsFillPersonFill className="text-xl text-blue-400" />
            </div>
            <p className="text-center text-white text-xl font-bold font-sans">
              My Account
            </p>
          </div>
          <div className="w-[90%] mx-auto h-[0.5rem] rounded-xl bg-white">
            <div
              className={`h-full w-[${profilePercentage}%] rounded-xl ${
                profilePercentage !== 100 ? "rounded-r-none" : ""
              }`}
              style={{ backgroundColor: "#1BC4BF" }}
            ></div>
          </div>
          <p className="text-center text-slate-200 mt-2 text-sm font-sans truncate">
            {profilePercentage !== 0
              ? `Profile ${profilePercentage}% complete`
              : "Profile _% complete"}
          </p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            selected === "Personal info"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateToMyAccount}
        >
          <BsFillPersonFill className="text-2xl mr-2" />
          <p className="font-bold truncate">Personal info</p>
        </div>
        <div
          className={`flex font-sans text-gray-700 p-3 rounded-xl ${
            selected === "Notifications"
              ? "bg-blue-400"
              : "bg-slate-300 hover:bg-slate-400"
          } m-4 cursor-pointer items-center`}
          onClick={navigateToNotifications}
        >
          <IoNotifications className="text-2xl mr-2" />
          <p className="font-bold truncate">Notifications</p>
        </div>
        <Password />
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
