"use client";

import React, { useEffect, useState } from "react";
import DeliveryHeader from "@/app/components/DeliveryHeader";
import { IoStatsChart } from "react-icons/io5";
import Stepper from "@/app/components/Stepper";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiProgress2Line } from "react-icons/ri";
import { RiProgress4Line } from "react-icons/ri";
import { RiProgress6Line } from "react-icons/ri";
import { RiProgress8Line } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";

const page = () => {
  const [step, setStep] = useState(-1);
  useEffect(() => {
    let status = JSON.parse(localStorage.getItem("deliveryStatus"));
    if (status) {
      setStep(status.step);
    }
  }, []);

  return (
    <div div className="w-full overflow-y-auto">
      <DeliveryHeader />
      <div className="max-w-[50rem] mx-auto">
        <div className="flex justify-center items-center mb-5 mt-4">
          <IoStatsChart className="mr-2 text-6xl text-gray-700" />
          <p className="font-serif text-4xl font-bold text-gray-700 mt-4">
            Order Status
          </p>
        </div>
        <div className="w-full flex p-3 gap-3 items-center justify-around shadow-md shadow-gray-400 rounded-lg bg-slate-100">
          <div className="h-full items-center flex">
            <GiProgression className="text-8xl text-gray-700" />
            <div className="flex flex-col ml-3">
              <p className="text-3xl font-bold text-gray-700 font-sans flex items-center">
                Order Progress <FaArrowRightLong className="ml-3 text-3xl" />
              </p>
              <p className="text-md text-gray-500 font-sans mt-1">
                As soon as status is updated, <br /> customer will be notified
              </p>
            </div>
          </div>
          {step === 0 && (
            <RiProgress2Line className="h-[10rem] w-[10rem] text-gray-600" />
          )}
          {step === 1 && (
            <RiProgress4Line className="h-[10rem] w-[10rem] text-gray-600" />
          )}
          {step === 2 && (
            <RiProgress6Line className="h-[10rem] w-[10rem] text-gray-600" />
          )}
          {step === 3 && (
            <RiProgress8Line className="h-[10rem] w-[10rem] text-gray-600" />
          )}
        </div>
        <div className="mt-7 mb-4">
          <Stepper step={step} />
        </div>
        <div className="w-[50%] min-w-[12rem] p-2 font-bold font-sans text-white bg-gray-700 hover:bg-gray-900 shadow-md shadow-black text-center rounded-full mx-auto mt-2 cursor-pointer flex items-center justify-center mb-6">
          Mark the next step as done
          <FaArrowRightLong className="ml-3 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default page;
