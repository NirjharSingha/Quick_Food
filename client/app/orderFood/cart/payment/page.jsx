"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useGlobals } from "@/app/contexts/Globals";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { jwtDecode } from "jwt-decode";
import Alert from "@/app/components/Alert";
import { MdPayments } from "react-icons/md";
import Stepper2 from "@/app/components/Stepper2";
import statusTick from "@/app/animations/statusTick.json";
import Lottie from "lottie-react";

const page = () => {
  const { setToastMessage, setIsLoggedIn, setCartCount } = useGlobals();
  const router = useRouter();
  const alertRef = useRef(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [tipIndex, setTipIndex] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const tipAmounts = [0, 10, 20, 30, 40, 50];

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setFoodCost(cart.total);
    }
  }, []);

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
      paymentMethod: paymentMethod,
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
        setShowAnimation(true);
        setTimeout(() => {
          localStorage.removeItem("cart");
          setCartCount(0);
          router.push("/orderFood");
          setToastMessage("Order Placed Successfully");
        }, 3000);
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
    <div className="h-full justify-center items-center w-full text-gray-800">
      {showAnimation && (
        <Lottie
          animationData={statusTick}
          className="w-[40svh] h-[40svh] mx-auto my-auto mt-10"
        />
      )}
      {!showAnimation && (
        <div className="pt-4 pb-4 pl-1 pr-1 md:pl-3 md:pr-3 w-full max-w-[45rem] mx-auto h-full overflow-y-auto">
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
          <div className="overflow-x-auto">
            <Stepper2 step={2} />
          </div>
          <div className="flex justify-center items-center mb-4">
            <MdPayments className="mr-2 text-4xl sm:text-5xl text-gray-700" />
            <p className="font-serif text-2xl sm:text-3xl font-bold text-gray-700">
              Payment
            </p>
          </div>
          <div className="flex flex-col border-2 border-gray-200 shadow rounded-md mx-auto w-full pt-2 pb-2 mb-6">
            <p className="font-bold font-sans text-xl pl-2 pr-2 mb-1">
              Payment Method:
            </p>
            <div className="h-[1.5px] w-full bg-gray-200 mb-1" />
            <div className="flex items-center pl-2 pr-2 mb-1">
              <input
                type="radio"
                id="Online"
                name="paymentMethod"
                value="ONLINE"
                className="cursor-pointer h-4 w-4 mr-1"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="Online" className="font-bold font-sans">
                Online
              </label>
            </div>
            <div className="flex items-center pl-2 pr-2">
              <input
                type="radio"
                id="COD"
                name="paymentMethod"
                value="COD"
                className="cursor-pointer h-4 w-4 mr-1"
                checked={paymentMethod === "COD"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setTipIndex(0);
                }}
              />
              <label htmlFor="COD" className="font-bold font-sans">
                Cash On Delivery
              </label>
            </div>
          </div>
          <div className="flex flex-col border-2 border-gray-200 shadow rounded-md mx-auto w-full pt-2 pb-2 mb-6">
            <p className="font-bold font-sans text-xl pl-2 pr-2 mb-1">
              Tip Your Rider:
            </p>
            <div className="h-[1.5px] w-full bg-gray-200 mb-1" />
            <p className="font-sans pl-2 pr-2">
              100% of the tip goes to your rider. We don't deduct anything from
              it. (Only applicable for online payment)
            </p>
            <div className="grid grid-cols-3 mt-2 mb-1 gap-2 pl-2 pr-2 font-serif font-bold">
              {tipAmounts.map((tipAmount, index) => (
                <button
                  className={`rounded-md w-full justify-center items-center text-sm p-1 ${
                    tipIndex === index
                      ? "bg-blue-500"
                      : `bg-slate-200 ${
                          paymentMethod === "ONLINE" ? "hover:bg-slate-300" : ""
                        }`
                  } ${
                    paymentMethod === "ONLINE"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  key={index}
                  onClick={() => {
                    if (paymentMethod === "ONLINE") {
                      setTipIndex(index);
                    }
                  }}
                >
                  {tipAmount === 0 ? "Not Now" : tipAmount}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col border-2 border-gray-200 shadow rounded-md mx-auto w-full pt-2 pb-2">
            <p className="font-bold font-sans text-xl pl-2 pr-2 mb-1">
              Order summary:
            </p>
            <div className="h-[1.5px] w-full bg-gray-200 mb-1" />
            <p className="font-sans pl-2 pr-2 mb-1">
              {" "}
              <span className="font-bold">Food Cost:</span>{" "}
              {foodCost.toFixed(0)} Tk
            </p>
            <p className="font-sans pl-2 pr-2 mb-1">
              {" "}
              <span className="font-bold">Delivery Charge:</span>{" "}
              {(foodCost * 0.1).toFixed(0)} Tk
            </p>
            <p className="font-sans pl-2 pr-2 mb-1">
              {" "}
              <span className="font-bold">Rider Tip:</span>{" "}
              {tipIndex === 0 ? "No Tip" : `${tipAmounts[tipIndex]} Tk`}
            </p>
            <p className="font-sans pl-2 pr-2 mb-1">
              {" "}
              <span className="font-bold">Total Amount:</span>{" "}
              {parseInt(foodCost.toFixed(0)) +
                parseInt((foodCost * 0.1).toFixed(0)) +
                parseInt(tipAmounts[tipIndex])}{" "}
              Tk
            </p>
            <p className="font-sans pl-2 pr-2">
              {" "}
              <span className="font-bold">Payment Method:</span> {paymentMethod}
            </p>
          </div>
          <div
            className={`w-full mx-auto h-8 bg-gray-300 font-sans font-bold mt-5 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer`}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
