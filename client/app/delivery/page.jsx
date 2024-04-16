"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import Delivery from "@/public/Delivery.png";
import Image from "next/image";
import { IoStatsChart } from "react-icons/io5";
import { MdDataset } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import FavIcon from "@/public/favicon.ico";

const page = () => {
  const router = useRouter();
  const detailsRef = useRef(null);
  const statusRef = useRef(null);
  const mapRef = useRef(null);
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const getDeliveryData = async () => {
      const riderId = jwtDecode(localStorage.getItem("token")).sub;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/order/deliveryOfRider?riderId=${riderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          console.log("response", response.data);
          if (response.data.orderId === null) {
            setShowMessage(true);
            setShowLoading(false);
          } else {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/order/getOrderDataPage?orderId=${response.data.orderId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.status === 200) {
              setOrderDetails(res.data);
              setShowLoading(false);
            }
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getDeliveryData();
  }, []);

  return (
    <>
      {showMessage && (
        <p className="text-md font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Order to Deliver
        </p>
      )}
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showMessage && !showLoading && (
        <div div className="w-full overflow-y-auto">
          <div className="w-full flex justify-center bg-gray-700 p-2 pl-4 pr-4 min-h-[4rem] shadow-md shadow-gray-400 rounded-bl-md flex-col">
            <div className="flex items-center navbar-start">
              <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
                <Image src={FavIcon} alt="logo" width={30} />
              </div>
              <p className="ml-1 text-2xl text-white font-bold">
                Your Orders To Deliver
              </p>
            </div>
            <ul className="w-full text-gray-300 mt-4 text-md font-sans list-disc pl-4">
              <li>Get the details of the order you have to deliver. </li>
              <li>
                Update the status of the order accordingly to notify the
                customer about the delivery.
              </li>
              <li>
                You can also view the location of the customer on the map.
              </li>
            </ul>
            <div className="w-full flex justify-between mt-4 text-md font-sans font-bold text-white">
              <div className="pl-4 pr-4 pb-1 border-4 rounded-md border-gray-700 hover:border-b-green-600 hover:text-green-600 cursor-pointer">
                Order
                <br />
                Details
              </div>
              <div className="pl-4 pr-4 pb-1 border-4 rounded-md border-gray-700 hover:border-b-green-600 hover:text-green-600 cursor-pointer">
                Order
                <br />
                Status
              </div>
              <div className="pl-4 pr-4 pb-1 border-4 rounded-md border-gray-700 hover:border-b-green-600 hover:text-green-600 cursor-pointer">
                Location
                <br />
                On Map
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
