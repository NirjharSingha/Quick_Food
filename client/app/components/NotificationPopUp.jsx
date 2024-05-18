"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotificationPopUp = ({ title, text, setShow, redirectUrl }) => {
  const router = useRouter();
  return (
    <div
      role="alert"
      class="alert grid shadow-lg bg-slate-300 relative"
      style={{ gridTemplateColumns: "1rem auto 3.5rem" }}
    >
      <button
        className="w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center text-white bg-red-500 hover:bg-red-700 absolute top-0 right-0"
        onClick={() => setShow(false)}
      >
        ✕
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 class="font-bold">{title}</h3>
        <div class="text-xs">{text}</div>
      </div>
      <button
        class="btn btn-sm"
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
