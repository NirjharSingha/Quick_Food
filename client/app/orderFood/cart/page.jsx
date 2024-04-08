"use client";

import React from "react";
import Loading from "@/app/components/Loading";
import { useState } from "react";
import Cart from "@/app/components/Cart";
import { useGlobals } from "@/app/contexts/Globals";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { jwtDecode } from "jwt-decode";
import Alert from "@/app/components/Alert";

const page = () => {
  const [showLoading, setShowLoading] = useState(false);
  const { setToastMessage, setIsLoggedIn, setCartCount } = useGlobals();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const alertRef = useRef(null);
  const [alertTitle, setAlertTitle] = useState("");

  const handlePlaceOrder = async () => {
    let dataToSend = [];
    let cart = JSON.parse(localStorage.getItem("cart"));
    const selectedMenu = cart.selectedMenu;

    selectedMenu.forEach((menu) => {
      dataToSend.push({
        id: menu.selectedMenuId,
        quantity: menu.selectedMenuQuantity,
      });
    });

    const placeOrderData = {
      userId: jwtDecode(localStorage.getItem("token")).sub,
      restaurantId: cart.restaurantId,
      deliveryAddress: "",
      deliveryTime: 30,
      paymentMethod: "COD",
      price: total,
      deliveryFee: total * 0.1,
      orderQuantities: dataToSend,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/order/placeOrder`,
        placeOrderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("cart");
        setCartCount(0);
        router.push("/orderFood");
        setToastMessage("Order Placed Successfully");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertTitle(error.response.data);
        alertRef.current.click();
      }
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

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
              if (response.data.length === 0) {
                setShowMessage(true);
              } else {
                setCart(response.data);
                let tempTotal = 0;
                response.data.forEach((menu, index) => {
                  tempTotal += menu.price * tempQuantity[index];
                });
                setTotal(tempTotal);
              }
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
        } else {
          setShowMessage(true);
        }
      } else {
        setShowMessage(true);
      }
    };

    getCart();
  }, []);

  return (
    <>
      {showMessage && (
        <p className="text-md col-span-3 font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Items in Cart
        </p>
      )}
      <Alert
        buttonRef={alertRef}
        title={alertTitle}
        message={`Sorry, we are unable to place your order because of ${alertTitle.toLowerCase()}. Please try again later.`}
        continueHandler={() => {
          localStorage.removeItem("cart");
          setCartCount(0);
          alertRef.current.click();
          router.push(`/orderFood`);
        }}
        flag={true}
      />
      {!showMessage && (
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
                onClick={handlePlaceOrder}
              >
                Place Order
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default page;
