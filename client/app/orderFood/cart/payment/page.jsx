"use client";

import React from "react";
import { useState } from "react";
import { useGlobals } from "@/app/contexts/Globals";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { jwtDecode } from "jwt-decode";
import Alert from "@/app/components/Alert";

const page = () => {
  const { setToastMessage, setIsLoggedIn, setCartCount } = useGlobals();
  const router = useRouter();
  const alertRef = useRef(null);
  const [alertTitle, setAlertTitle] = useState("");

  const handleConfirmOrder = async () => {
    let dataToSend = [];
    let cart = JSON.parse(localStorage.getItem("cart"));
    const selectedMenu = cart.selectedMenu;

    selectedMenu.forEach((menu) => {
      dataToSend.push({
        id: menu.selectedMenuId,
        quantity: menu.selectedMenuQuantity,
      });
    });

    console.log(cart.address);

    const placeOrderData = {
      userId: jwtDecode(localStorage.getItem("token")).sub,
      restaurantId: cart.restaurantId,
      deliveryAddress: cart.address,
      latitude: cart.latitude,
      longitude: cart.longitude,
      deliveryTime: 30,
      paymentMethod: "COD",
      price: cart.total,
      deliveryFee: cart.total * 0.1,
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
  return (
    <div>
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
      <button onClick={handleConfirmOrder}>confirm order</button>
    </div>
  );
};

export default page;
