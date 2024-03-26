"use client";

import React from "react";
import RestaurantCard from "@/app/components/RestaurantCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const { resId } = params;
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    console.log("resId", resId);
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
          setRestaurants(response.data);
          if (response.data.length === 0) {
            setShowMessage(true);
          }
        }
      } catch (error) {
        console.log("Error:", error.response);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getRestaurants();
  }, []);

  return (
    <div className="p-4 w-full grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto">
      {showMessage && (
        <p className="text-md col-span-3 font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Menu Items Found
        </p>
      )}
      {restaurants.length !== 0 &&
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="w-full flex justify-center">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
    </div>
  );
};

export default page;
