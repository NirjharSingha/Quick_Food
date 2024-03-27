"use client";

import React from "react";
import MenuCard from "@/app/components/MenuCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";

const page = () => {
  const { setToastMessage, setIsLoggedIn, menu, setMenu } = useGlobals();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const getMenu = async () => {
      const resId = localStorage.getItem("restaurantId");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/menu/getMenuByResId?resId=${resId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setMenu(response.data);
          if (response.data.length === 0) {
            setShowMessage(true);
          } else {
            setShowMessage(false);
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getMenu();
  }, []);

  return (
    <div className="p-4 w-full grid grid-cols-3 gap-x-2 gap-y-4 overflow-y-auto">
      {showMessage && (
        <p className="text-md col-span-3 font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Menu Items Found
        </p>
      )}
      {menu.length !== 0 &&
        menu.map((menuItem) => (
          <div key={menuItem.id} className="w-full flex justify-center">
            <MenuCard menu={menuItem} />
          </div>
        ))}
    </div>
  );
};

export default page;
