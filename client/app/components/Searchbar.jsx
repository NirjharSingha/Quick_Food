"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import Image from "next/image";
import FavIcon from "@/public/favicon.ico";
import SearchResult from "./SearchResult";

const Searchbar = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ]);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const containerRef = useRef(null);

  const handleInputChange = async (value) => {
    setInputValue(value);
    if (value.length > 0) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="flex w-full">
        <div className="h-[1.8rem] w-16 bg-white border-2 border-solid border-gray-500 flex justify-center items-center mt-0.5rem rounded-l-full border-r-0 max-w-14">
          <IoSearchOutline className="text-gray-500 text-[1.1rem]" />
        </div>
        <input
          type="text"
          className="bg-white w-80 h-[1.8rem] border-2 border-solid border-gray-500 rounded-r-full pl-2 border-l-0 focus:border-gray-500 focus:outline-none max-w-48"
          placeholder="Type to search"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {showResult && (
        <SearchResult
          filteredData={filteredData}
          setShowResult={setShowResult}
          containerRef={containerRef}
        />
      )}
    </div>
  );
};

export default Searchbar;
