"use client";

import React from "react";
import RestaurantCard from "@/app/components/RestaurantCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import Searchbar from "../components/Searchbar";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";

const page = () => {
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [sendRequest, setSendRequest] = useState(true);
  const divRef = useRef(null);
  const [showLoading, setShowLoading] = useState(true);

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
        setShowLoading(true);
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
          setShowLoading(false);
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
    <div className="w-full overflow-y-auto" ref={divRef}>
      {
        <div className="w-full flex items-center justify-between bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-bl-md">
          <div className="flex items-center navbar-start">
            <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
              <Image src={FavIcon} alt="logo" width={26} />
            </div>
            <p className="ml-1 text-xl text-white font-bold">
              Select Restaurant
            </p>
          </div>
          <Searchbar />
        </div>
      }
      <div className="p-4 grid grid-cols-3 gap-x-2 gap-y-4">
        {restaurants.length !== 0 &&
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="w-full flex justify-center">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
      </div>
      {showLoading && (
        <div className="col-span-3">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
