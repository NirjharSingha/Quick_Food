"use client";

import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import Loading from "@/app/components/Loading";

const page = () => {
  const router = useRouter();
  const {
    setIsLoggedIn,
    setToastMessage,
    windowWidth,
    chatUsers,
    setChatUsers,
  } = useGlobals();
  const [showLoading, setShowLoading] = useState(false);

  const getChatUsers = async () => {
    try {
      setShowLoading(true);
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).sub;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/getChatUsers?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setShowLoading(false);
        setChatUsers(response.data);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    getChatUsers();
  }, []);

  return (
    <div
      className="w-full flex flex-col overflow-y-auto"
      style={{ maxHeight: "calc(100svh - 4rem)" }}
    >
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showLoading && (
        <div
          className={`w-full flex justify-center bg-gray-700 p-2 pl-4 pr-4 shadow-md shadow-gray-400 ${
            windowWidth > 900 ? "rounded-bl-md" : "rounded-bl-none"
          } flex-col`}
        >
          <div className="flex items-center pt-2">
            <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
              <Image src={FavIcon} alt="logo" width={30} />
            </div>
            <p
              className={`ml-1 ${
                windowWidth > 500
                  ? "text-2xl"
                  : windowWidth > 300
                  ? "text-lg"
                  : "text-base"
              } text-white font-bold`}
            >
              Chat-Rooms
            </p>
          </div>
          <ul
            className={`w-full text-gray-300 mt-4 mb-2 ${
              windowWidth > 500 ? "" : "text-sm"
            } font-sans list-disc pl-4`}
          >
            <li>
              When you place an order, you will be connected in a chat room with
              your rider.
            </li>
            <li>
              As soon as the delivery is completed, the chat room will be
              dissolved.
            </li>
          </ul>
        </div>
      )}
      {!showLoading && (
        <div className="w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-full p-1 sm:p-3">
          {chatUsers.map((chatUser) => (
            <div
              className={`flex p-2 shadow-md shadow-slate-300 rounded-md hover:bg-slate-200 cursor-pointer items-center mb-4`}
              style={{ gridAutoColumns: "34px auto 30px" }}
              key={chatUser.roomId}
              onClick={() => {
                router.push(`/orderFood/chat/${chatUser.roomId}`);
              }}
            >
              <div
                className="bg-white flex justify-center items-center rounded-full border-[1px] border-solid border-gray-500"
                style={{ gridColumn: "1" }}
              >
                <img
                  src={
                    chatUser.image === null
                      ? "/user.svg"
                      : `data:image/jpeg;base64,${chatUser.image}`
                  }
                  alt="logo"
                  width={34}
                  height={34}
                />
              </div>
              <p
                className="ml-2 mr-2 text-gray-700 font-serif w-full truncate font-semibold"
                style={{ gridColumn: "2" }}
              >
                {chatUser.name}
              </p>
              {chatUser.unseenCount > 0 && (
                <div
                  className="text-xs w-[26px] h-[26px] rounded-full bg-gray-300 flex justify-center items-center"
                  style={{ gridColumn: "3" }}
                >
                  {chatUser.unseenCount}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
