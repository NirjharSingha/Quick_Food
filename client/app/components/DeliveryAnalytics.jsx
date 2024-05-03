"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Calendar from "@/app/components/Calender";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/app/contexts/Globals";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import Doughnut from "@/app/components/charts/Doughnut";
import StackedBarChart from "@/app/components/charts/StackedBarChart";

const DeliveryAnalytics = ({ riderId }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(Date.now()));
  const { setIsLoggedIn, setToastMessage, windowWidth } = useGlobals();
  const [showCalendar, setShowCalendar] = useState(false);
  const [weeklyDeliveryLabel, setWeeklyDeliveryLabel] = useState([]);
  const [weeklySuccessDelivery, setWeeklySuccessDelivery] = useState([]);
  const [weeklyLateDelivery, setWeeklyLateDelivery] = useState([]);
  const [weeklyComplaint, setWeeklyComplaint] = useState([]);
  const [weeklyBoth, setWeeklyBoth] = useState([]);
  const [monthlyDeliveryLabel, setMonthlyDeliveryLabel] = useState([]);
  const [monthlySuccessDelivery, setMonthlySuccessDelivery] = useState([]);
  const [monthlyLateDelivery, setMonthlyLateDelivery] = useState([]);
  const [monthlyComplaint, setMonthlyComplaint] = useState([]);
  const [monthlyBoth, setMonthlyBoth] = useState([]);
  const [allDeliveryLabels, setAllDeliveryLabels] = useState([]);
  const [allDeliveryData, setAllDeliveryData] = useState([]);
  const [showDoughnut, setShowDoughnut] = useState(false);
  const calenderRef = useRef(null);
  const iconRef = useRef(null);

  const monthlyDelivery = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/monthlyDeliveryStatus?riderId=${riderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data.reverse();
        const labels = data.map((item) => item.name.substring(0, 3));
        const noIssue = data.map((item) => item.successDeliveries);
        const lateDelivery = data.map((item) => item.lateDeliveries);
        const complaint = data.map((item) => item.complaintDeliveries);
        const both = data.map((item) => item.bothIssues);

        setMonthlyDeliveryLabel(labels);
        setMonthlySuccessDelivery(noIssue);
        setMonthlyLateDelivery(lateDelivery);
        setMonthlyComplaint(complaint);
        setMonthlyBoth(both);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const weeklyDelivery = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/user/weeklyDeliveryStatus?timestampString=${date.toISOString()}&riderId=${riderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data.reverse();
        const labels = data.map((item) => item.name.substring(0, 3));
        const noIssue = data.map((item) => item.successDeliveries);
        const lateDelivery = data.map((item) => item.lateDeliveries);
        const complaint = data.map((item) => item.complaintDeliveries);
        const both = data.map((item) => item.bothIssues);

        setWeeklyDeliveryLabel(labels);
        setWeeklySuccessDelivery(noIssue);
        setWeeklyLateDelivery(lateDelivery);
        setWeeklyComplaint(complaint);
        setWeeklyBoth(both);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const allDelivery = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/allDelivery?riderId=${riderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const labels = data.map((item) => item.first);
        const values = data.map((item) => {
          if (item.second > 0) {
            setShowDoughnut(true);
          }
          return item.second;
        });

        setAllDeliveryLabels(labels);
        setAllDeliveryData(values);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    weeklyDelivery();
  }, [date, riderId]);

  useEffect(() => {
    monthlyDelivery();
    allDelivery();
  }, [riderId]);

  return (
    <div className="w-full h-full overflow-y-auto p-3 relative overflow-x-hidden">
      <div
        className="w-full grid gap-1 p-3 shadow-sm shadow-gray-400 rounded-lg bg-slate-100"
        style={{ gridTemplateColumns: "2.7rem auto 2.7rem" }}
      >
        <div
          className={`${
            windowWidth > 460
              ? "w-[2.4rem] h-[2.4rem]"
              : "w-[1.8rem] h-[1.8rem]"
          } rounded-full bg-gray-500 flex justify-center items-center my-auto`}
        >
          <IoStatsChart
            className={`${
              windowWidth > 460 ? "text-3xl" : "text-xl"
            } text-white`}
          />
        </div>
        <p
          className={`my-auto font-sans text-gray-700 font-bold ${
            windowWidth > 460 ? "text-lg" : "text-sm"
          }`}
        >
          Weekly Delivery Status
        </p>
        <div ref={iconRef} className="ml-auto my-auto">
          <FaCalendarDays
            className={`${
              windowWidth > 460 ? "text-3xl" : "text-xl"
            } text-gray-500 cursor-pointer hover:text-gray-700`}
            onClick={() => setShowCalendar((prev) => !prev)}
          />
        </div>
      </div>
      {showCalendar && (
        <div className="absolute right-4 z-10 bg-white" ref={calenderRef}>
          <Calendar
            date={date}
            setDate={setDate}
            containerRef={calenderRef}
            iconRef={iconRef}
            setShowCalendar={setShowCalendar}
          />
        </div>
      )}
      <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
        <StackedBarChart
          allLabels={weeklyDeliveryLabel}
          noIssue={weeklySuccessDelivery}
          lateDelivery={weeklyLateDelivery}
          complaint={weeklyComplaint}
          both={weeklyBoth}
        />
        <p
          className={`${
            windowWidth > 460 ? "" : "text-[0.8rem]"
          } w-full text-center font-serif mt-3 font-bold text-gray-700`}
        >
          A stacked bar chart on weekly delivery status.
        </p>
      </div>
      <div
        className="w-full grid gap-1 p-3 shadow-sm shadow-gray-400 rounded-lg bg-slate-100 mt-12"
        style={{ gridTemplateColumns: "2.7rem auto" }}
      >
        <div
          className={`${
            windowWidth > 460
              ? "w-[2.4rem] h-[2.4rem]"
              : "w-[1.8rem] h-[1.8rem]"
          } rounded-full bg-gray-500 flex justify-center items-center my-auto`}
        >
          <IoStatsChart
            className={`${
              windowWidth > 460 ? "text-3xl" : "text-xl"
            } text-white`}
          />
        </div>
        <p
          className={`my-auto font-sans text-gray-700 font-bold ${
            windowWidth > 460 ? "text-lg" : "text-sm"
          }`}
        >
          Monthly delivery status
        </p>
      </div>
      <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
        <StackedBarChart
          allLabels={monthlyDeliveryLabel}
          noIssue={monthlySuccessDelivery}
          lateDelivery={monthlyLateDelivery}
          complaint={monthlyComplaint}
          both={monthlyBoth}
        />
        <p
          className={`${
            windowWidth > 460 ? "" : "text-[0.8rem]"
          } w-full text-center font-serif mt-3 font-bold text-gray-700`}
        >
          A stacked bar chart on monthly delivery status.
        </p>
      </div>
      {showDoughnut && (
        <>
          <div
            className="w-full grid gap-1 p-3 shadow-sm shadow-gray-400 rounded-lg bg-slate-100 mt-12"
            style={{ gridTemplateColumns: "2.7rem auto" }}
          >
            <div
              className={`${
                windowWidth > 460
                  ? "w-[2.4rem] h-[2.4rem]"
                  : "w-[1.8rem] h-[1.8rem]"
              } rounded-full bg-gray-500 flex justify-center items-center my-auto`}
            >
              <RiDiscountPercentFill
                className={`${
                  windowWidth > 460 ? "text-3xl" : "text-xl"
                } text-white`}
              />
            </div>
            <p
              className={`my-auto font-sans text-gray-700 font-bold ${
                windowWidth > 460 ? "text-lg" : "text-sm"
              }`}
            >
              All Delivery Analysis
            </p>
          </div>
          <div
            className={`pl-2 pr-2 mt-8 mb-4 ${
              windowWidth > 400
                ? "max-w-[500px] max-h-[500px]"
                : "max-w-[550px] max-h-[550px]"
            } m-auto`}
          >
            <Doughnut allLabels={allDeliveryLabels} allData={allDeliveryData} />
            <p
              className={`${
                windowWidth > 460 ? "" : "text-[0.8rem]"
              } w-full text-center font-serif mt-3 font-bold text-gray-700`}
            >
              A doughnut chart on all Delivery Analysis
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryAnalytics;

// responsive
