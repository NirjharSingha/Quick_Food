"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Calendar from "@/app/components/Calender";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/app/contexts/Globals";
import { MdAttachMoney } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { PiStarFill } from "react-icons/pi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import LineChart from "@/app/components/charts/LineChart";
import BarChart from "@/app/components/charts/BarChart";
import Doughnut from "@/app/components/charts/Doughnut";
import StackedBarChart from "@/app/components/charts/StackedBarChart";

const page = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(Date.now()));
  const [date2, setDate2] = useState(new Date(Date.now()));
  const { setIsLoggedIn, setToastMessage, windowWidth } = useGlobals();
  const [weeklySaleLabel, setWeeklySaleLabel] = useState([]);
  const [weeklySaleData, setWeeklySaleData] = useState([]);
  const [monthlySaleLabel, setMonthlySaleLabel] = useState([]);
  const [monthlySaleData, setMonthlySaleData] = useState([]);
  const [topSoldLabel, setTopSoldLabel] = useState([]);
  const [topSoldData, setTopSoldData] = useState([]);
  const [topReviewedLabel, setTopReviewedLabel] = useState([]);
  const [topReviewedData, setTopReviewedData] = useState([]);
  const [reviewFlag, setReviewFlag] = useState("best");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
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
  const calenderRef = useRef(null);
  const calenderRef2 = useRef(null);
  const iconRef = useRef(null);
  const iconRef2 = useRef(null);

  const monthlyDelivery = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/monthlyDeliveryStatus`,
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
        }/admin/weeklyDeliveryStatus?timestampString=${date2.toISOString()}`,
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

  const weeklySale = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/admin/getWeeklySale?timestampString=${date.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data.reverse();
        const labels = data.map((item) => item.first.substring(0, 3));
        const sale = data.map((item) => item.second);

        setWeeklySaleLabel(labels);
        setWeeklySaleData(sale);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const monthlySale = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getMonthlySale`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data.reverse();
        const labels = data.map((item) => item.first.substring(0, 3));
        const sale = data.map((item) => item.second);

        setMonthlySaleLabel(labels);
        setMonthlySaleData(sale);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const topSold = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/salePerRestaurant`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const labels = data.map((item) => item.first);
        const sale = data.map((item) => item.second);

        setTopSoldLabel(labels);
        setTopSoldData(sale);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const topReviewed = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/topReviewedRestaurants?flag=${reviewFlag}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const labels = data.map((item) => item.first);
        const values = data.map((item) => item.second);

        setTopReviewedLabel(labels);
        setTopReviewedData(values);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    weeklySale();
  }, [date]);

  useEffect(() => {
    weeklyDelivery();
  }, [date2]);

  useEffect(() => {
    topReviewed();
  }, [reviewFlag]);

  useEffect(() => {
    monthlySale();
    monthlyDelivery();
    topSold();
  }, []);

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
          <MdAttachMoney
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
          Weekly sale Data
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
        <LineChart allLabels={weeklySaleLabel} allData={weeklySaleData} />
        <p
          className={`${
            windowWidth > 460 ? "" : "text-[0.8rem]"
          } w-full text-center font-serif mt-3 font-bold text-gray-700`}
        >
          A line chart on weekly sale data.
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
          <MdAttachMoney
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
          Monthly sale data
        </p>
      </div>
      <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
        <LineChart allLabels={monthlySaleLabel} allData={monthlySaleData} />
        <p
          className={`${
            windowWidth > 460 ? "" : "text-[0.8rem]"
          } w-full text-center font-serif mt-3 font-bold text-gray-700`}
        >
          A line chart on monthly sale data.
        </p>
      </div>
      {topSoldData.length > 0 && topSoldLabel.length > 0 && (
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
              Top selling restaurants
            </p>
          </div>
          <div
            className={`pl-2 pr-2 mt-8 mb-4 ${
              windowWidth > 400
                ? "max-w-[500px] max-h-[500px]"
                : "max-w-[550px] max-h-[550px]"
            } m-auto`}
          >
            <Doughnut allLabels={topSoldLabel} allData={topSoldData} />
            <p
              className={`${
                windowWidth > 460 ? "" : "text-[0.8rem]"
              } w-full text-center font-serif mt-3 font-bold text-gray-700`}
            >
              A doughnut chart on top selling restaurants
            </p>
          </div>
        </>
      )}
      {topReviewedLabel.length > 0 && topReviewedData.length > 0 && (
        <>
          <div
            className="w-full grid gap-1 p-3 shadow-sm shadow-gray-400 rounded-lg bg-slate-100 mt-16"
            style={{
              gridTemplateColumns: `2.7rem auto ${
                windowWidth > 440 ? "8rem" : "3rem"
              }`,
            }}
          >
            <div
              className={`${
                windowWidth > 460
                  ? "w-[2.4rem] h-[2.4rem]"
                  : "w-[1.8rem] h-[1.8rem]"
              } rounded-full bg-gray-500 flex justify-center items-center my-auto`}
            >
              <PiStarFill
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
              Best or worst reviewed restaurants
            </p>
            <div
              className={`ml-auto my-auto flex items-center ${
                windowWidth > 440 ? "space-x-2" : "flex-col space-y-1"
              }`}
            >
              <p
                className={`text-sm ${
                  reviewFlag === "best" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Best
              </p>
              <Switch
                id="review"
                onClick={() => {
                  setReviewFlag((prev) => (prev === "best" ? "worst" : "best"));
                }}
              />
              <p
                className={`text-sm ${
                  reviewFlag === "worst" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Worst
              </p>
            </div>
          </div>
          <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
            <BarChart allLabels={topReviewedLabel} allData={topReviewedData} />
            <p
              className={`${
                windowWidth > 460 ? "" : "text-[0.8rem]"
              } w-full text-center font-serif mt-3 font-bold text-gray-700`}
            >
              A bar chart on the {reviewFlag} reviewed restaurants.
            </p>
          </div>
        </>
      )}
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
          Weekly delivery status
        </p>
        <div ref={iconRef2} className="ml-auto my-auto">
          <FaCalendarDays
            className={`${
              windowWidth > 460 ? "text-3xl" : "text-xl"
            } text-gray-500 cursor-pointer hover:text-gray-700`}
            onClick={() => setShowCalendar2((prev) => !prev)}
          />
        </div>
      </div>
      {showCalendar2 && (
        <div className="absolute right-4 z-10 bg-white" ref={calenderRef2}>
          <Calendar
            date={date2}
            setDate={setDate2}
            containerRef={calenderRef2}
            iconRef={iconRef2}
            setShowCalendar={setShowCalendar2}
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
    </div>
  );
};

export default page;

// responsive
