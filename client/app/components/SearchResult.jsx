import React from "react";
import { useEffect } from "react";

const SearchResult = ({ filteredData, setShowResult, containerRef }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResult(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="absolute top-16 left-14 w-[17.3rem] h-[20rem] bg-gray-200 rounded-lg rounded-t-none border-0 border-gray-500 shadow-md overflow-x-hidden overflow-y-auto z-50 scrollNone">
      {filteredData.map((searchItem) => (
        <div
          key={searchItem}
          className="h-[42px] p-[5px] pb-[2.5px] pt-[2.5px] mb-1 ml-1 mr-1 flex items-center rounded hover:cursor-pointer hover:bg-gray-400"
        >
          <img
            src={"/favicon.ico"}
            alt=""
            className="w-[2rem] h-[2rem] rounded-[50%] bg-blue-400 border-2 border-solid border-white"
          />
          <p className="ml-[8px] truncate">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
