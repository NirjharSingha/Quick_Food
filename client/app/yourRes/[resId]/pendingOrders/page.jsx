"use client";

import React from "react";
import OrderCard from "@/app/components/OrderCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import OrderDetailsDialog from "@/app/components/OrderDetailsDialog";

const page = () => {
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const buttonRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(0);

  useEffect(() => {
    const getPendingOrders = async () => {
      const resId = localStorage.getItem("restaurantId");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/order/getOrderCard?id=${resId}&flag=resPendingOrder`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          setPendingOrders(response.data);
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
    getPendingOrders();
  }, []);

  return (
    <div className="p-4 w-full grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto">
      <OrderDetailsDialog buttonRef={buttonRef} selectedOrder={selectedOrder} />
      {showMessage && (
        <p className="text-md col-span-3 font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Pending Orders
        </p>
      )}
      {pendingOrders.length !== 0 &&
        pendingOrders.map((order) => (
          <div key={order.id} className="w-full flex justify-center">
            <OrderCard
              order={order}
              buttonRef={buttonRef}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        ))}
      {showLoading && (
        <div className="col-span-3">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
