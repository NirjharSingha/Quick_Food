"use client";

import React from "react";
import Image from "next/image";
import Restaurant from "@/public/Restaurant.jpeg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const OrderCard = ({ order, buttonRef, setSelectedOrder }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname.includes("/orderFood/submitRating")) {
      router.push(`/orderFood/submitRating/${order.id}`);
    }
    if (pathname.includes("/yourRes") && pathname.includes("/pendingOrders")) {
      setSelectedOrder(order.id);
      buttonRef.current.click();
    }
  };

  return (
    <div
      className="w-[26vw] min-w-[18rem] max-w-[21rem] h-[17.8rem] rounded-lg shadow-md bg-base-100 border-2 border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-lg"
      onClick={handleClick}
    >
      {order.restaurantPic ? (
        <img
          src={`data:image/jpeg;base64,${order.restaurantPic}`}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      ) : (
        <Image
          placeholder="blur"
          src={Restaurant}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      )}
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        {order.restaurantName}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Total : {order.price} Tk
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Payment : {order.paymentMethod === "COD" ? "COD" : "Done"}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Date : {new Date(order.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
};

export default OrderCard;
