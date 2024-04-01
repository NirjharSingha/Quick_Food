"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchResult = ({
  filteredData,
  setShowResult,
  containerRef,
  setInputValue,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResult(false);
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNavigate = (id) => {
    router.push(`/orderFood/${id}`);
  };

  return (
    <div className="absolute top-8 pt-2 pb-2 left-3 w-[17.7rem] h-[20rem] bg-gray-200 rounded-lg rounded-t-none border-0 border-gray-500 shadow-md overflow-x-hidden overflow-y-auto z-50 scrollNone">
      {filteredData.map((searchItem, index) => (
        <div
          key={`${searchItem.id}-${index}`}
          className="h-[42px] p-[5px] pb-[2.5px] pt-[2.5px] mb-1 ml-1 mr-1 flex items-center rounded hover:cursor-pointer hover:bg-gray-400"
          onClick={() => handleNavigate(searchItem.id)}
        >
          <img
            src={
              searchItem.image === null
                ? "/Restaurant.jpeg"
                : "data:image/jpeg;base64," + searchItem.image
            }
            alt="logo"
            className="w-[2rem] h-[2rem] rounded-[50%] bg-blue-400 border-2 border-solid border-white"
          />
          <p className="ml-[8px] truncate">{searchItem.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
