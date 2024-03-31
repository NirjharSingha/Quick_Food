"use client";

import React from "react";
import Image from "next/image";
import Menu from "@/public/Menu.jpg";
import { FaStar } from "react-icons/fa";
import MenuDialog from "./MenuDialog";

const MenuCard = ({ menu, setMenuList }) => {
  return (
    <div className="w-[26vw] min-w-[18rem] max-w-[22rem] h-[20rem] rounded-lg shadow-md bg-base-100 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg">
      {menu.image ? (
        <img
          src={`data:image/jpeg;base64,${menu.image}`}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      ) : (
        <Image
          placeholder="blur"
          src={Menu}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      )}
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        {menu.name}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Category :{" "}
        {menu.category
          ? menu.category === "NON_VEG"
            ? "NON-VEG"
            : menu.category
          : "Category Not Available"}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Available quantity :{" "}
        {menu.quantity > 0 ? menu.quantity : "Not Available"}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Price : {menu.price ? `${menu.price} Tk` : "Not Available"}
      </p>
      <div className="flex justify-between items-center mt-1">
        <MenuDialog isAdd={false} menu={menu} setMenuList={setMenuList} />
        <div className="mt-1 flex gap-1 w-[3.7rem] justify-center items-center font-bold text-white bg-green-700 rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
          4.5 <FaStar />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
