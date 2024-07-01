"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotificationPopUp = ({ title, text, setShow, redirectUrl }) => {
  const router = useRouter();
  return (
    <div
      role="alert"
      className="alert grid shadow-lg bg-slate-400 relative rounded-lg"
      style={{ gridTemplateColumns: "1rem auto 3.5rem" }}
    >
      <button
        className="w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center text-white hover:bg-red-500 absolute top-0 right-0 font-bold"
        onClick={() => setShow(false)}
      >
        ✕
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold">{title}</h3>
        <div className="text-xs">{text}</div>
      </div>
      <button
        className="btn btn-sm"
        onClick={() => {
          router.push(redirectUrl);
          setShow(false);
        }}
      >
        See
      </button>
    </div>
  );
};

export default NotificationPopUp;
