"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import SearchResult from "./SearchResult";
import { useGlobals } from "../contexts/Globals";
import axios from "axios";
import { handleUnauthorized } from "../utils/unauthorized";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [inputValue, setInputValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = async (value) => {
    setInputValue(value);
    if (value.length > 0) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
    if (value.length === 1) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/searchRestaurant?name=${value}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response) {
          setFetchedData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    } else if (value.length === 0) {
      setFilteredData([]);
    } else {
      setFilteredData(() => {
        const data = fetchedData.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        return data;
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex w-full">
        <div className="h-[2rem] w-14 bg-white border-2 border-solid border-gray-500 flex justify-center items-center mt-0.5rem rounded-l-full border-r-0 min-h-[2rem]">
          <IoSearchOutline className="text-gray-500 text-[1.1rem]" />
        </div>
        <input
          type="text"
          className={`bg-white h-[2rem] border-2 border-solid border-gray-500 rounded-r-full border-l-0 focus:border-gray-500 focus:outline-none min-h-[2rem] ${
            windowWidth < 640
              ? windowWidth > 530
                ? "w-[11.7rem] text-[0.8rem]"
                : windowWidth > 335
                ? "w-[15.7rem]"
                : "w-[90%]"
              : "w-[15.7rem]"
          }`}
          placeholder="Search Restaurants"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {showResult && (
        <SearchResult
          filteredData={filteredData}
          setShowResult={setShowResult}
          containerRef={containerRef}
          setInputValue={setInputValue}
        />
      )}
    </div>
  );
};

export default Searchbar;

// responsive
