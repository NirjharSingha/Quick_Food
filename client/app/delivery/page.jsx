"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { MdDataset } from "react-icons/md";
import DeliveryHeader from "../components/DeliveryHeader";
import OrderDetailsTable from "../components/OrderDetailsTable";
import OrderDetailsCard from "../components/OrderDetailsCard";

const page = () => {
  const router = useRouter();
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableQuantity, setTableQuantity] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const getDeliveryData = async () => {
      setShowLoading(true);
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
          if (response.data.orderId === null) {
            setShowMessage(true);
            setShowLoading(false);
          } else {
            const { orderId, latitude, longitude } = response.data;
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/order/getOrderDataPage?orderId=${orderId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.status === 200) {
              setOrderDetails(res.data);
              let data = [];
              let quantity = [];
              res.data.menuItems.forEach((item) => {
                data.push({
                  id: item.menuId,
                  name: item.menuName,
                  price: item.price,
                  image: item.image,
                });
                quantity.push(item.quantity);
              });
              setTableData(data);
              setTableQuantity(quantity);

              let timeStamps = [
                res.data.orderPlaced,
                res.data.deliveryTaken,
                res.data.userNotified,
                res.data.deliveryCompleted,
              ];

              let step = 0;
              for (let i = 1; i < timeStamps.length; i++) {
                if (timeStamps[i] !== null) {
                  step++;
                }
              }
              localStorage.setItem(
                "deliveryStatus",
                JSON.stringify({
                  orderId: orderId,
                  step: step,
                  latitude: latitude,
                  longitude: longitude,
                })
              );

              setShowLoading(false);
            }
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          console.log("Unauthorized");
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        } else if (error.response.status === 404) {
          setShowMessage(true);
          setShowLoading(false);
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
          <DeliveryHeader />
          <div className="flex justify-center items-center mb-4 mt-4">
            <MdDataset
              className={`mr-2 ${
                windowWidth > 650 ? "text-6xl" : "text-5xl"
              } text-gray-700`}
            />
            <p
              className={`font-serif ${
                windowWidth > 650 ? "text-4xl" : "text-2xl"
              } font-bold text-gray-700`}
            >
              Order Details
            </p>
          </div>
          <OrderDetailsCard
            orderDetails={orderDetails}
            windowWidth={windowWidth}
          />
          <div className={`p-4 ${windowWidth > 700 ? "" : "pl-1 pr-1"}`}>
            <OrderDetailsTable data={tableData} quantity={tableQuantity} />
          </div>
        </div>
      )}
    </>
  );
};

export default page;

// responsive
