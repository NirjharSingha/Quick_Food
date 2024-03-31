"use client";

import React from "react";
import RestaurantCard from "@/app/components/RestaurantCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";

const page = () => {
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [sendRequest, setSendRequest] = useState(true);
  const divRef = useRef(null);

  const handleScroll = (divRef, prevScrollTop, setPrevScrollTop, setPage) => {
    const currentScrollTop = divRef.current.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      if (
        divRef.current.scrollHeight -
          divRef.current.scrollTop -
          divRef.current.clientHeight <
        1
      ) {
        setPage((prev) => prev + 1);
      }
    }
    setPrevScrollTop(currentScrollTop);
  };

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      const scrollHandler = () =>
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setPage);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/restaurant/getRestaurantsByPagination?size=${7}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setRestaurants((prev) => [...prev, ...response.data]);
          if (response.data.length < 7) {
            setSendRequest(false);
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    if (sendRequest) {
      getRestaurants();
    }
  }, [page]);

  return (
    <div
      className="p-4 w-full grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto"
      ref={divRef}
    >
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
