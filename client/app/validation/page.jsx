"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/app/contexts/Globals";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const page = () => {
  const router = useRouter();
  const { setToastMessage, setIsLoggedIn, setCartCount } = useGlobals();
  const buttonRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [status, setStatus] = useState("");

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

    const placeOrderData = {
      userId: jwtDecode(localStorage.getItem("token")).sub,
      restaurantId: cart.restaurantId,
      deliveryAddress: cart.address,
      latitude: cart.latitude,
      longitude: cart.longitude,
      deliveryTime: 30,
      paymentMethod: "ONLINE",
      price: cart.total,
      riderTip: cart.riderTip,
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
        setAlertMessage(
          "Your order has been placed successfully. Please stay with use in future."
        );
        setStatus("SUCCESS");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(
          `Sorry, we are unable to place your order because of ${error.response.data.toLowerCase()}. Please try again later.`
        );
        setStatus("FAILED");
      }
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    handleConfirmOrder();
    buttonRef.current.click();
  }, []);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="hidden" ref={buttonRef}>
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[100svh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="mx-auto flex justify-center items-center gap-2 mb-1">
            <div
              className={`w-10 h-10 rounded-full border-4 flex justify-center items-center ${
                status === "SUCCESS" ? "border-green-700" : "border-red-700"
              }`}
            >
              {status === "SUCCESS" && (
                <FaCheck className="text-green-700 text-xl" />
              )}
              {status === "FAILED" && (
                <ImCross className="text-red-700 text-lg" />
              )}
            </div>
            <p
              className={`font-bold text-2xl ${
                status === "SUCCESS" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status}
            </p>
          </div>
          <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>
            Go To Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default page;
