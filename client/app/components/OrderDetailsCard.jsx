import React from "react";
import FoodDelivery from "@/public/foodDelivery.png";
import Image from "next/image";

const OrderDetailsCard = ({ orderDetails }) => {
  return (
    <div
      className="h-[18.5rem] p-1 pt-3 pb-3 ml-4 shadow-md border-gray-300 border-[0.1px] shadow-gray-300 rounded-xl flex gap-3 mb-3"
      style={{ width: "calc(100% - 2rem)" }}
    >
      <Image
        src={FoodDelivery}
        alt="logo"
        className="h-[full] w-auto max-w-[20rem] rounded-lg"
        placeholder="blur"
      />
      <div className="h-full flex flex-col justify-center w-full overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Customer :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.customerName}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Restaurant :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.restaurantName}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Price :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.price ? orderDetails.price.toFixed(0) : ""} Tk
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Delivery Charge :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.deliveryFee
              ? orderDetails.deliveryFee.toFixed(0)
              : ""}{" "}
            Tk
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Total Bill :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.price && orderDetails.deliveryFee
              ? parseInt(orderDetails.price) +
                parseInt(orderDetails.deliveryFee)
              : ""}{" "}
            Tk
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Payment :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.paymentMethod === "COD" ? "COD" : "Done"}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Delivery Address :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.deliveryAddress}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-bold text-gray-700 truncate font-sans">
            Delivery Time :
          </p>
          <p className="text-md font-sans text-gray-500 mt-[1px] truncate">
            {orderDetails.deliveryTime} min
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
