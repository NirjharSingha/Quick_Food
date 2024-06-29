"use client";

import React, { useRef } from "react";
import { useEffect } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const Likes = ({ selected, setShouldDisplayAllLikes, flag, likeHandler }) => {
  const likesRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (likesRef.current && !likesRef.current.contains(event.target)) {
        setShouldDisplayAllLikes(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`flex items-center p-1 justify-around gap-2 z-50 bg-white rounded-md shadow-md shadow-slate-300 ${
        flag ? "mb-6" : ""
      }`}
      ref={likesRef}
    >
      <AiFillLike
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] text-blue-600 cursor-pointer ${
          selected === "LIKE" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("LIKE");
        }}
      />
      <AiFillDislike
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] text-blue-600 cursor-pointer ${
          selected === "DISLIKE" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("DISLIKE");
        }}
      />
      <FaLaughSquint
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] text-yellow-500 cursor-pointer ${
          selected === "LAUGH" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("LAUGH");
        }}
      />
      <FaAngry
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] text-red-400 cursor-pointer ${
          selected === "ANGRY" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("ANGRY");
        }}
      />
      <FaSadCry
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] text-yellow-500 cursor-pointer ${
          selected === "SAD" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("SAD");
        }}
      />
      <FcLike
        className={`flex items-center text-[1.5rem] hover:text-[1.9rem] cursor-pointer ${
          selected === "LOVE" ? "bg-gray-400 p-[2px] rounded-sm" : ""
        }`}
        onClick={async () => {
          likeHandler("LOVE");
        }}
      />
    </div>
  );
};

export default Likes;
