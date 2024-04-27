"use client";

import React from "react";
import OrderCard from "@/app/components/OrderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";

const page = () => {
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const router = useRouter();
  const [orderCards, setOrderCards] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getOrderCards = async () => {
      const userId = jwtDecode(localStorage.getItem("token")).sub;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/order/getOrderCard?id=${userId}&flag=rating`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          setOrderCards(response.data);
          if (response.data.length === 0) {
            setShowMessage(true);
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getOrderCards();
  }, []);

  return (
    <div div className="w-full overflow-y-auto">
      <div
        className={`w-full flex items-center justify-between bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 ${
          windowWidth > 900 ? "rounded-bl-md" : "rounded-none"
        }`}
      >
        <div className="flex items-center">
          <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
            <Image src={FavIcon} alt="logo" width={26} />
          </div>
          <p className="ml-1 text-white font-bold text-base sm:text-xl">
            {windowWidth > 400
              ? "Orders for which you didn't give rating"
              : "Orders to give rating"}
          </p>
        </div>
      </div>
      <div
        className={`p-4 grid ${
          windowWidth > 1410
            ? "grid-cols-4"
            : windowWidth > 1130
            ? "grid-cols-3"
            : windowWidth > 900 && windowWidth < 1130
            ? "grid-cols-2"
            : windowWidth > 810
            ? "grid-cols-3"
            : windowWidth > 550
            ? "grid-cols-2"
            : "grid-cols-1"
        } gap-x-2 gap-y-4`}
      >
        {orderCards.length !== 0 &&
          orderCards.map((order) => (
            <div key={order.id} className="w-full flex justify-center">
              <OrderCard order={order} />
            </div>
          ))}
      </div>
      {showLoading && (
        <div className="col-span-4">
          <Loading />
        </div>
      )}
      {showMessage && (
        <p
          className="text-md col-span-4 font-serif text-gray-700 w-full text-center flex justify-center items-center"
          style={{ height: "calc(100svh - 10rem)" }}
        >
          No Orders To Give Rating
        </p>
      )}
    </div>
  );
};

export default page;

// responsive
