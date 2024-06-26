"use client";

import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const page = () => {
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getRestaurants = async () => {
      const owner = jwtDecode(localStorage.getItem("token")).sub;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getRestaurantByOwner?owner=${owner}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          setRestaurants(response.data);
          if (response.data.length === 0) {
            setShowMessage(true);
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getRestaurants();
  }, []);

  return (
    <div
      className={`p-4 w-full grid ${
        windowWidth > 1410
          ? "grid-cols-4"
          : windowWidth > 1130
          ? "grid-cols-3"
          : windowWidth > 900 && windowWidth < 1130
          ? "grid-cols-2"
          : windowWidth > 810
          ? "grid-cols-3"
          : windowWidth > 550
          ? "grid-cols-2"
          : "grid-cols-1"
      } gap-x-2 gap-y-4 overflow-y-auto`}
    >
      {showMessage && (
        <p className="text-md col-span-4 font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Restaurants Found
        </p>
      )}
      {restaurants.length !== 0 &&
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="w-full flex justify-center">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      {showLoading && (
        <div className="col-span-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;

// responsive
