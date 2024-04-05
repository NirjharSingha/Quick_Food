"use client";

import React from "react";
import Loading from "@/app/components/Loading";
import { useState } from "react";
import Cart from "@/app/components/Cart";
import { useGlobals } from "@/app/contexts/Globals";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "@/app/utils/unauthorized";

const page = () => {
  const [showLoading, setShowLoading] = useState(false);
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const getCart = async () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        const selectedMenu = cart.selectedMenu;

        if (selectedMenu && selectedMenu.length !== 0) {
          let ids = [];
          let tempQuantity = [];
          selectedMenu.forEach((menu) => {
            ids.push(menu.selectedMenuId);
            tempQuantity.push(menu.selectedMenuQuantity);
          });
          setQuantity(tempQuantity);

          const token = localStorage.getItem("token");
          try {
            setShowLoading(true);
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/menu/getCartMenu?menuIds=${ids}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              setCart(response.data);
              let tempTotal = 0;
              response.data.forEach((menu, index) => {
                tempTotal += menu.price * tempQuantity[index];
              });
              setTotal(tempTotal);
            }
          } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
              handleUnauthorized(setIsLoggedIn, setToastMessage, router);
            }
          }

          const selectedRes = cart.restaurantId;
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/getRestaurantName?resId=${selectedRes}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              setRestaurantName(response.data);
              setShowLoading(false);
            }
          } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
              handleUnauthorized(setIsLoggedIn, setToastMessage, router);
            }
          }
        }
      }
    };

    getCart();
  }, []);

  return (
    <div className="bg-slate-100 h-full w-full">
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showLoading && (
        <div className="h-full">
          <Cart
            data={cart}
            quantity={quantity}
            total={total}
            restaurantName={restaurantName}
          />
          <div
            className={`w-full max-w-[42.5rem] mx-auto h-8 bg-gray-300 font-sans font-bold mt-5 mb-5 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer`}
          >
            Apply
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
