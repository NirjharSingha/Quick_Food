"use client";

import React, { useEffect, useState, useRef } from "react";
import DeliveryHeader from "@/app/components/DeliveryHeader";
import { IoStatsChart } from "react-icons/io5";
import Stepper from "@/app/components/Stepper";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiProgress2Line } from "react-icons/ri";
import { RiProgress4Line } from "react-icons/ri";
import { RiProgress6Line } from "react-icons/ri";
import { RiProgress8Line } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import statusTick from "@/app/animations/statusTick.json";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/app/contexts/Globals";
import axios from "axios";
import Alert from "@/app/components/Alert";

const page = () => {
  const router = useRouter();
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [step, setStep] = useState(-1);
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    let status = JSON.parse(localStorage.getItem("deliveryStatus"));
    if (status) {
      setStep(status.step);
    }
  }, []);

  const handleClick = async () => {
    let status = JSON.parse(localStorage.getItem("deliveryStatus"));
    if (status) {
      let orderId = status.orderId;
      let step = status.step;

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/order/updateStatus?orderId=${orderId}&status=${step}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          if (response.data === "Status updated") {
            if (step < 2) {
              setStep((prev) => prev + 1);
              localStorage.setItem(
                "deliveryStatus",
                JSON.stringify({ orderId: orderId, step: step + 1 })
              );
              setShowAnimation(true);
              setTimeout(() => {
                setShowAnimation(false);
              }, 3000);
            } else {
              setShowAnimation(true);
              setTimeout(() => {
                setShowAnimation(false);
                localStorage.removeItem("deliveryStatus");
                router.push("/delivery");
                setToastMessage("Order delivered successfully");
              }, 3000);
            }
          } else if (response.data === "Cancelled order") {
            localStorage.removeItem("deliveryStatus");
            router.push("/delivery");
            setToastMessage("The order has been cancelled");
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        } else {
          setToastMessage("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div div className="w-full overflow-y-auto">
      <Alert
        buttonRef={buttonRef}
        title={"Update Status"}
        message={
          "Once the status is updated it cannot be rolled back. Are you sure to continue?"
        }
        continueHandler={handleClick}
        cancelHandler={() => {
          buttonRef.current.click();
        }}
      />
      <DeliveryHeader />
      {showAnimation && (
        <Lottie
          animationData={statusTick}
          className="w-[40svh] h-[40svh] mx-auto mt-8"
        />
      )}
      {!showAnimation && (
        <div className="max-w-[50rem] mx-auto">
          <div className="flex justify-center items-center mb-5 mt-4">
            <IoStatsChart
              className={`mr-2 ${
                windowWidth > 650 ? "text-6xl" : "text-5xl"
              } text-gray-700`}
            />
            <p
              className={`font-serif ${
                windowWidth > 650 ? "text-4xl mt-2" : "text-3xl mt-3"
              } font-bold text-gray-700`}
            >
              Order Status
            </p>
          </div>
          <div className="w-full shadow-md shadow-gray-400 rounded-lg bg-slate-100 overflow-x-auto">
            <div className="flex p-3 pl-1 pr-1 sm:pl-3 sm:pr-3 gap-3 items-center justify-around min-w-[380px]">
              <div className="h-full items-center flex">
                {windowWidth > 500 && (
                  <GiProgression
                    className={`${
                      windowWidth > 650 ? "text-8xl" : "text-6xl"
                    } text-gray-700`}
                  />
                )}
                <div className="flex flex-col ml-3">
                  <p
                    className={`${
                      windowWidth > 650 ? "text-3xl" : "text-2xl"
                    } font-bold text-gray-700 font-sans flex items-center`}
                  >
                    Order Progress{" "}
                    <FaArrowRightLong
                      className={`ml-3 ${
                        windowWidth > 650 ? "text-3xl" : "text-2xl"
                      }`}
                    />
                  </p>
                  <p
                    className={`${
                      windowWidth > 650 ? "" : "text-sm"
                    } text-gray-500 font-sans mt-1`}
                  >
                    As soon as status is updated, <br /> customer will be
                    notified
                  </p>
                </div>
              </div>
              {step === 0 && (
                <RiProgress2Line
                  className={`${
                    windowWidth > 650
                      ? "h-[10rem] w-[10rem]"
                      : "h-[8rem] w-[8rem]"
                  } text-gray-600`}
                />
              )}
              {step === 1 && (
                <RiProgress4Line
                  className={`${
                    windowWidth > 650
                      ? "h-[10rem] w-[10rem]"
                      : "h-[8rem] w-[8rem]"
                  } text-gray-600`}
                />
              )}
              {step === 2 && (
                <RiProgress6Line
                  className={`${
                    windowWidth > 650
                      ? "h-[10rem] w-[10rem]"
                      : "h-[8rem] w-[8rem]"
                  } text-gray-600`}
                />
              )}
              {step === 3 && (
                <RiProgress8Line
                  className={`${
                    windowWidth > 650
                      ? "h-[10rem] w-[10rem]"
                      : "h-[8rem] w-[8rem]"
                  } text-gray-600`}
                />
              )}
            </div>
          </div>
          <div className="mt-7 mb-4 overflow-x-auto">
            <Stepper step={step} />
          </div>
          <div
            className={`${
              windowWidth > 650 ? "w-[50%]" : "w-[85%] text-sm"
            } min-w-[12rem] p-2 font-bold font-sans text-white bg-gray-700 hover:bg-gray-900 shadow-md shadow-black text-center rounded-full mx-auto mt-2 cursor-pointer flex items-center justify-center mb-6`}
            onClick={() => {
              buttonRef.current.click();
            }}
          >
            Mark the next step as done
            <FaArrowRightLong
              className={`ml-3 ${windowWidth > 650 ? "text-2xl" : "text-xl"}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

// responsive
