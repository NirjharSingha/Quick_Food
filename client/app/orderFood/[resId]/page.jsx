"use client";

import React from "react";
import MenuCard from "@/app/components/MenuCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import Filter from "@/app/components/Filter";

const page = ({ params }) => {
  const { resId } = params;
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [sendRequest, setSendRequest] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const menuDivRef = useRef(null);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

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
      try {
        setShowLoading(true);
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/menu/getFilteredMenu?name=${nameFilter}&resId=${resId}&category=${categoryFilter}&price=${priceFilter}&rating=${ratingFilter}&page=${page}&size=${7}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          if (page === 0) {
            setMenu(response.data);
          } else {
            const responseData = response.data;
            setMenu((prev) => {
              // Filter out elements from responseData that already exist in prev based on their IDs
              const filteredData = responseData.filter(
                (newItem) =>
                  !prev.some((prevItem) => prevItem.id === newItem.id)
              );
              // Merge the filtered data with the previous state
              return [...prev, ...filteredData];
            });
          }
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
  }, [page, sendRequest]);

  useEffect(() => {
    setSendRequest(true);
    setPage(0);
  }, [nameFilter, categoryFilter, priceFilter, ratingFilter]);

  return (
    <div div className="w-full overflow-y-auto" ref={menuDivRef}>
      {
        <div className="w-full flex items-center justify-between bg-gray-300 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-md rounded-t-none">
          <div className="flex items-center navbar-start">
            <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
              <Image src={FavIcon} alt="logo" width={26} />
            </div>
            <p className="ml-1 text-xl text-gray-600 font-bold">Select Food</p>
          </div>
          <Filter
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />
        </div>
      }
      <div className="p-4 grid grid-cols-3 gap-x-2 gap-y-4">
        {menu.length !== 0 &&
          menu.map((menuItem) => (
            <div key={menuItem.id} className="w-full flex justify-center">
              <MenuCard menu={menuItem} />
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
