"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import SearchResult from "./SearchResult";
import { useGlobals } from "../contexts/Globals";
import axios from "axios";

const Searchbar = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { windowWidth } = useGlobals();
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
        {windowWidth >= 500 && (
          <>
            <div className="h-[2rem] w-14 bg-white border-2 border-solid border-gray-500 flex justify-center items-center mt-0.5rem rounded-l-full border-r-0 min-h-[2rem]">
              <IoSearchOutline className="text-gray-500 text-[1.1rem]" />
            </div>
            <input
              type="text"
              className="bg-white h-[2rem] border-2 border-solid border-gray-500 rounded-r-full border-l-0 focus:border-gray-500 focus:outline-none min-h-[2rem]"
              placeholder="Type to search"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </>
        )}
        {windowWidth < 500 && (
          <div className="h-[2rem] ml-2 w-[2rem] rounded-full bg-gray-200 flex justify-center items-center mt-0.5rem min-h-[2rem] cursor-pointer">
            <IoSearchOutline className="text-gray-500 text-[1.1rem]" />
          </div>
        )}
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
