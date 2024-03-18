"use client";

import React, { useEffect } from "react";
import Profile from "../components/Profile";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { BsFillPersonFill } from "react-icons/bs";
import Password from "../components/Password";

const page = () => {
  const router = useRouter();
  const {
    setIsLoggedIn,
    profilePercentage,
    setProfilePercentage,
    setToastMessage,
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
            <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
              <Image src={FavIcon} alt="logo" width={30} />
            </div>
            <p className="text-center text-white text-xl font-bold font-sans">
              Quick Food
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
        <div className="flex font-sans text-gray-700 p-3 rounded-lg bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center">
          <BsFillPersonFill className="text-2xl mr-2" />
          <p className="font-bold">Personal info</p>
        </div>
        <Password />
      </div>
      <div className="h-full flex-grow">
        <Profile />
      </div>
    </div>
  );
};

export default page;
