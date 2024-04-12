import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import OrderDetailsTable from "./OrderDetailsTable";

const Cart = ({ data, quantity, total, restaurantName }) => {
  return (
    <div
      className="max-w-[42.5rem] mt-1 rounded-md mx-auto overflow-y-auto shadow-md shadow-gray-400 p-5"
      style={{ height: "calc(100% - 4.75rem)" }}
    >
      <div className="flex justify-center items-center mb-3">
        <FaShoppingCart className="mr-2 text-4xl text-gray-700" />
        <p className="font-serif text-3xl font-bold text-gray-700">Cart</p>
      </div>
      <div className="w-full h-[9rem] p-1 shadow-md border-gray-300 border-[0.1px] shadow-gray-300 rounded-xl flex gap-3 mb-3">
        <img
          src="/foodDelivery.png"
          alt="logo"
          className="w-[11.5rem] h-[8.5rem] rounded-lg"
        />
        <div className="h-full flex flex-col justify-center w-full overflow-hidden">
          <p className="text-2xl font-bold text-gray-700 truncate font-sans mb-2">
            {restaurantName}
          </p>
          <p className="text-md font-sans text-gray-500">
            Estimated Delivery :
          </p>
          <p className="text-md font-sans text-gray-500">Within 30 minutes</p>
        </div>
      </div>
      <OrderDetailsTable data={data} quantity={quantity} />
      <p className="mt-3 w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
        Total Food Price : {total} Tk
      </p>
      <p className="mt-3 mb-2 w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
        Delivery Charge : {(total * 0.1).toFixed(0)} Tk
      </p>
      <div className="h-[1px] w-full rounded-full bg-gray-700" />
      <p className="mt-2 w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
        Total Cost : {(total + total * 0.1).toFixed(0)} Tk
      </p>
    </div>
  );
};

export default Cart;
