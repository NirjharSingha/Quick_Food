"use client";

import React from "react";
import MenuCard from "@/app/components/MenuCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

const page = () => {
  const { setToastMessage, setIsLoggedIn, menu, setMenu, menuDivRef } =
    useGlobals();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [sendRequest, setSendRequest] = useState(true);
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
    const currentDivRef = menuDivRef.current;

    if (currentDivRef) {
      const scrollHandler = () =>
        handleScroll(menuDivRef, prevScrollTop, setPrevScrollTop, setPage);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    const getMenu = async () => {
      const resId = localStorage.getItem("restaurantId");
      try {
        setShowLoading(true);
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/menu/getMenuByResId?resId=${resId}&page=${page}&size=${7}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          const responseData = response.data;
          setMenu((prev) => {
            // Filter out elements from responseData that already exist in prev based on their IDs
            const filteredData = responseData.filter(
              (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
            );
            // Merge the filtered data with the previous state
            return [...prev, ...filteredData];
          });
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
      getMenu();
    }
  }, [page]);

  return (
    <div
      className="p-4 w-full grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto"
      ref={menuDivRef}
    >
      {menu.length !== 0 &&
        menu.map((menuItem) => (
          <div key={menuItem.id} className="w-full flex justify-center">
            <MenuCard menu={menuItem} />
          </div>
        ))}
      {showLoading && (
        <div className="col-span-3">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
