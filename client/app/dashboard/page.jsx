import React from "react";
import Profile from "../components/Profile";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";

const page = () => {
  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto flex"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div className="w-[30%] max-w-[20rem] h-full bg-gray-300">
        <div
          className="mx-auto m-4 rounded-lg bg-gray-500 pt-3 pb-3"
          style={{ width: "calc(100% - 2rem)" }}
        >
          <div className="flex justify-center items-center mb-3">
            <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white w-[2.3rem] h-[2.3rem]">
              <Image src={FavIcon} alt="logo" width={30} />
            </div>
            <p className="text-center text-white text-xl font-bold font-sans">
              Quick Food
            </p>
          </div>
          <div className="w-[90%] mx-auto h-[0.5rem] rounded-xl bg-white">
            <div
              className="h-full w-[60%] rounded-xl rounded-r-none"
              style={{ backgroundColor: "#1BC4BF" }}
            ></div>
          </div>
          <p className="text-center text-slate-300 mt-2 text-sm font-sans truncate">
            {`Profile x% complete`}
          </p>
        </div>
      </div>
      <div className="h-full flex-grow">
        <Profile />
      </div>
    </div>
  );
};

export default page;
