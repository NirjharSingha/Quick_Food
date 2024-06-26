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
import { MdPending } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import LineChart from "@/app/components/charts/LineChart";
import Doughnut from "@/app/components/charts/Doughnut";
import BarChart from "@/app/components/charts/BarChart";
import { usePathname } from "next/navigation";

const ResAnalytics = ({ resId }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(Date.now()));
  const { setIsLoggedIn, setToastMessage, windowWidth } = useGlobals();
  const [weeklySaleLabel, setWeeklySaleLabel] = useState([]);
  const [weeklySaleData, setWeeklySaleData] = useState([]);
  const [monthlySaleLabel, setMonthlySaleLabel] = useState([]);
  const [monthlySaleData, setMonthlySaleData] = useState([]);
  const [topSoldItemsLabel, setTopSoldItemsLabel] = useState([]);
  const [topSoldItemsData, setTopSoldItemsData] = useState([]);
  const [topReviewedItemsLabel, setTopReviewedItemsLabel] = useState([]);
  const [topReviewedItemsData, setTopReviewedItemsData] = useState([]);
  const [pendingOrdersLabel, setPendingOrdersLabel] = useState([]);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [reviewFlag, setReviewFlag] = useState("best");
  const [showCalendar, setShowCalendar] = useState(false);
  const calenderRef = useRef(null);
  const iconRef = useRef(null);
  const pathname = usePathname();

  const pendingOrdersFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getPendingOrdersToday?restaurantId=${resId}`,
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

        setPendingOrdersLabel(labels);
        setPendingOrdersData(values);
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
        }/restaurant/getWeeklyRestaurantSale?timestampString=${date.toISOString()}&restaurantId=${resId}`,
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getMonthlyRestaurantSale?restaurantId=${resId}`,
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

  const topSoldItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getTopSoldItems?restaurantId=${resId}`,
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

        setTopSoldItemsLabel(labels);
        setTopSoldItemsData(sale);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  const topReviewedItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getTopReviewedItems?restaurantId=${resId}&flag=${reviewFlag}`,
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

        setTopReviewedItemsLabel(labels);
        setTopReviewedItemsData(values);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    if (resId !== "") {
      weeklySale();
    }
  }, [date, resId]);

  useEffect(() => {
    if (resId !== "" && !pathname.includes("/admin/restaurants")) {
      topReviewedItems();
    }
  }, [reviewFlag, resId]);

  useEffect(() => {
    if (resId !== "") {
      monthlySale();
    }

    if (resId !== "" && !pathname.includes("/admin/restaurants")) {
      topSoldItems();
      pendingOrdersFetch();
    }
  }, [resId]);

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
          Sale of the restaurant on a week
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
          A line chart of the weekly sale of your restaurant.
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
          Sale of the restaurant over last 6 months
        </p>
      </div>
      <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
        <LineChart allLabels={monthlySaleLabel} allData={monthlySaleData} />
        <p
          className={`${
            windowWidth > 460 ? "" : "text-[0.8rem]"
          } w-full text-center font-serif mt-3 font-bold text-gray-700`}
        >
          A line chart of the monthly sale of your restaurant.
        </p>
      </div>
      {!pathname.includes("/admin/restaurants") &&
        topSoldItemsData.length > 0 &&
        topSoldItemsLabel.length > 0 && (
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
                Top sold items of the restaurant
              </p>
            </div>
            <div
              className={`pl-2 pr-2 mt-8 mb-4 ${
                windowWidth > 400
                  ? "max-w-[500px] max-h-[500px]"
                  : "max-w-[550px] max-h-[550px]"
              } m-auto`}
            >
              <Doughnut
                allLabels={topSoldItemsLabel}
                allData={topSoldItemsData}
              />
              <p
                className={`${
                  windowWidth > 460 ? "" : "text-[0.8rem]"
                } w-full text-center font-serif mt-3 font-bold text-gray-700`}
              >
                A doughnut chart of top sold items
              </p>
            </div>
          </>
        )}
      {!pathname.includes("/admin/restaurants") &&
        topReviewedItemsLabel.length > 0 &&
        topReviewedItemsData.length > 0 && (
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
                Best or worst reviewed items of the restaurant
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
                    setReviewFlag((prev) =>
                      prev === "best" ? "worst" : "best"
                    );
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
              <BarChart
                allLabels={topReviewedItemsLabel}
                allData={topReviewedItemsData}
              />
              <p
                className={`${
                  windowWidth > 460 ? "" : "text-[0.8rem]"
                } w-full text-center font-serif mt-3 font-bold text-gray-700`}
              >
                A bar chart of the {reviewFlag} reviewed items.
              </p>
            </div>
          </>
        )}
      {!pathname.includes("/admin/restaurants") &&
        pendingOrdersData.length > 0 &&
        pendingOrdersLabel.length > 0 && (
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
                <MdPending
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
                Current pending order status
              </p>
            </div>
            <div className="pl-2 pr-2 mt-8 mb-4 w-[90%] m-auto">
              <BarChart
                allLabels={pendingOrdersLabel}
                allData={pendingOrdersData}
              />
              <p
                className={`${
                  windowWidth > 460 ? "" : "text-[0.8rem]"
                } w-full text-center font-serif mt-3 font-bold text-gray-700`}
              >
                A bar chart of current pending orders
              </p>
            </div>
          </>
        )}
    </div>
  );
};

export default ResAnalytics;

// responsive
