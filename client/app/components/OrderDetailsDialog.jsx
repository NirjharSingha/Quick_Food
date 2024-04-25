"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Menu from "@/public/Menu.jpg";
import Image from "next/image";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { useGlobals } from "../contexts/Globals";
import OrderDetailsTable from "./OrderDetailsTable";
import { usePathname } from "next/navigation";
import Stepper from "./Stepper";

const OrderDetailsDialog = ({ buttonRef, selectedOrder, complaintRef }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [tableData, setTableData] = useState([]);
  const [tableQuantity, setTableQuantity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(-1);
  const router = useRouter();
  const pathname = usePathname();

  const getOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/order/getOrderDataPage?orderId=${selectedOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrderDetails(response.data);
        let data = [];
        let quantity = [];
        response.data.menuItems.forEach((item) => {
          data.push({
            id: item.menuId,
            name: item.menuName,
            price: item.price,
            image: item.image,
          });
          quantity.push(item.quantity);
        });
        setTableData(data);
        setTableQuantity(quantity);

        let timeStamps = [
          response.data.orderPlaced,
          response.data.deliveryTaken,
          response.data.userNotified,
          response.data.deliveryCompleted,
        ];

        let step = 0;
        for (let i = 1; i < timeStamps.length; i++) {
          if (timeStamps[i] !== null) {
            step++;
          }
        }

        setOrderStatus(step);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  useEffect(() => {
    if (selectedOrder !== 0) {
      getOrderDetails();
    }
  }, [selectedOrder]);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/order/markAsPrepared?orderId=${selectedOrder}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrderDetails((prev) => {
          return { ...prev, isPrepared: true };
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hidden" ref={buttonRef}>
          Button
        </div>
      </DialogTrigger>
      {!loading && (
        <DialogContent className="max-w-[600px] max-h-[94svh] overflow-y-auto">
          {pathname.includes("/yourRes") && (
            <div className="flex justify-center items-center mb-3 rounded-lg">
              <Image
                src={Menu}
                alt="logo"
                width={85}
                className="bg-white flex justify-center items-center mr-3 rounded-md border-[1px] border-solid border-gray-500 h-14"
              />
              <p className="font-serif text-3xl font-bold text-gray-700">
                Order
              </p>
            </div>
          )}
          {pathname.includes("/orderFood/orderStatus") && (
            <Stepper step={orderStatus} />
          )}
          <div className="w-full h-[10.5rem] p-1 shadow-md border-gray-300 border-[0.1px] shadow-gray-300 rounded-xl flex gap-3 mb-3 min-w-[450px]">
            <img
              src="/foodDelivery.png"
              alt="logo"
              className={`${
                windowWidth > 480
                  ? "w-[13rem] h-[10rem]"
                  : "w-[10rem] h-[8rem] my-auto"
              } rounded-lg`}
            />
            <div className="h-full flex flex-col justify-center w-full overflow-hidden">
              <p
                className={`${
                  windowWidth > 650 ? "text-xl" : "text-md"
                } font-bold text-gray-700 truncate font-sans mb-2`}
              >
                {pathname.includes("/yourRes")
                  ? `Customer : ${
                      orderDetails.customerName ? orderDetails.customerName : ""
                    }`
                  : `Restaurant : ${
                      orderDetails.restaurantName
                        ? orderDetails.restaurantName
                        : ""
                    }`}
              </p>
              <p
                className={`${
                  windowWidth > 650 ? "text-xl" : "text-md"
                } font-bold text-gray-700 truncate font-sans mb-2`}
              >
                Rider : {orderDetails.riderName ? orderDetails.riderName : ""}
              </p>
              <p
                className={`${
                  windowWidth > 650 ? "text-md" : "text-sm"
                } font-sans text-gray-500`}
              >
                Payment :{" "}
                {orderDetails.paymentMethod === "COD" ? "COD" : "Done"}
              </p>
              <p
                className={`${
                  windowWidth > 650 ? "text-md" : "text-sm"
                } font-sans text-gray-500`}
              >
                Order placed :{" "}
                {new Date(orderDetails.orderPlaced).toLocaleString()}
              </p>
            </div>
          </div>
          <OrderDetailsTable data={tableData} quantity={tableQuantity} />
          <p className="w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
            Total Food Price : {orderDetails.price ? orderDetails.price : ""} Tk
          </p>
          {!pathname.includes("/yourRes") && (
            <>
              <p className="w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
                Delivery Charge :
                {orderDetails.deliveryFee
                  ? orderDetails.deliveryFee.toFixed(0)
                  : ""}
                Tk
              </p>
              <div className="h-[1px] w-full rounded-full bg-gray-700" />
              <p className="w-full font-sans font-bold text-lg truncate text-right text-gray-600 pr-1">
                Total Cost :
                {orderDetails.deliveryFee && orderDetails.price
                  ? (orderDetails.price + orderDetails.deliveryFee).toFixed(0)
                  : ""}
                Tk
              </p>
            </>
          )}
          <DialogFooter>
            {pathname.includes("/yourRes") && (
              <Button
                className="w-full font-bold"
                disabled={orderDetails.isPrepared}
                onClick={handleClick}
              >
                {orderDetails.isPrepared
                  ? "Marked as Prepared"
                  : "Mark as Prepared"}
              </Button>
            )}
            {pathname.includes("/orderFood/orderStatus") &&
              orderStatus == 3 && (
                <div className="w-full mt-2 p-3 shadow-md shadow-gray-400">
                  <p className="font-sans font-bold text-2xl mb-4 text-gray-700 text-center">
                    Order completed successfully!
                  </p>
                  <Button
                    className="w-full font-bold"
                    onClick={() => {
                      buttonRef.current.click();
                      complaintRef.current.click();
                    }}
                  >
                    Do you want to complain?
                  </Button>
                </div>
              )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default OrderDetailsDialog;

// responsive
