"use client";

import React, { useEffect, useState } from "react";
import { useGlobals } from "@/app/contexts/Globals";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import axios from "axios";
import { useRouter } from "next/navigation";
import DashboardTable from "@/app/components/DashboardTable";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import Loading from "@/app/components/Loading";

const page = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getAllRestaurants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          setRestaurants(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };

    getAllRestaurants();
  }, []);

  return (
    <>
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showLoading && (
        <div div className="w-full overflow-y-auto">
          <div
            className={`w-full flex justify-center bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 ${
              windowWidth > 900 ? "rounded-bl-md" : "rounded-bl-none"
            } flex-col`}
          >
            <div className="flex items-center">
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
                All Restaurants
              </p>
            </div>
            <ul
              className={`w-full text-gray-300 mt-4 ${
                windowWidth > 500 ? "" : "text-sm"
              } font-sans list-disc pl-4 mb-2`}
            >
              <li>
                All the restaurants registered on the app are listed below.
              </li>
              <li>
                Click on the row of the restaurant to see the sales analysis of
                the restaurant.
              </li>
            </ul>
          </div>
          <div className={`p-4 ${windowWidth > 700 ? "" : "pl-1 pr-1"}`}>
            <DashboardTable data={restaurants} />
          </div>
        </div>
      )}
    </>
  );
};

export default page;

// responsive
