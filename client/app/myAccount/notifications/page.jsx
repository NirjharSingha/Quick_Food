"use client";

import React, { useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import { useGlobals } from "@/app/contexts/Globals";
import { jwtDecode } from "jwt-decode";

const page = ({ className, ...props }) => {
  const [notifications, setNotifications] = useState([]);
  const {
    setToastMessage,
    setIsLoggedIn,
    setUnSeenNotifications,
    windowWidth,
  } = useGlobals();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).sub;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/notification/getNotifications?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setNotifications(response.data.reverse());
          let count = 0;
          response.data.map((data) => {
            if (!data.isSeen) {
              count++;
            }
          });
          setUnreadCount(count);
          setUnSeenNotifications(0);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getNotifications();
  }, []);

  return (
    <div className="w-full flex justify-center relative">
      <Card
        className={cn(
          "w-full max-w-[50rem] rounded-none border-none shadow-none bg-transparent",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle className="flex gap-2 text-lg items-center">
            <IoNotificationsOutline className="text-xl" /> Notifications
          </CardTitle>
          <CardDescription>
            {unreadCount === 0
              ? "No unread notification"
              : `You have ${unreadCount} unread ${
                  unreadCount === 1 ? "notification" : "notifications"
                }`}
          </CardDescription>
        </CardHeader>
        <CardContent
          className="grid gap-3 overflow-y-auto"
          style={{ maxHeight: "calc(100svh - 14rem)" }}
        >
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr_25px] items-start pb-2 last:mb-0 shadow-sm shadow-gray-400 bg-base-100 rounded-md p-2 pt-3"
            >
              <span
                className={`flex h-2 w-2 translate-y-1 rounded-full ${
                  notification.isSeen ? "bg-white" : "bg-sky-500"
                }`}
              />
              <div className="space-y-1">
                <p
                  className={`${
                    windowWidth > 400 ? "text-md" : "text-sm"
                  } font-medium leading-none mr-2`}
                >
                  {notification.description}
                </p>
                <p
                  className={`${
                    windowWidth > 400 ? "text-sm" : "text-[0.8rem]"
                  } text-muted-foreground text-right mt-1 mr-2`}
                >
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              <MdOutlineDeleteOutline
                className="my-auto text-lg cursor-pointer"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await axios.delete(
                      `${process.env.NEXT_PUBLIC_SERVER_URL}/notification/deleteByNotificationId?notificationId=${notification.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    if (response.status === 200) {
                      if (!notification.isSeen) {
                        setUnreadCount((prev) => prev - 1);
                      }
                      setNotifications((prev) => {
                        const newNotifications = prev.filter(
                          (item) => item.id !== notification.id
                        );
                        return newNotifications;
                      });
                    }
                  } catch (error) {
                    console.log(error);
                    if (error.response.status === 401) {
                      handleUnauthorized(
                        setIsLoggedIn,
                        setToastMessage,
                        router
                      );
                    }
                  }
                }}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 max-w-[47rem]"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const userId = jwtDecode(token).sub;
                const response = await axios.delete(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/notification/deleteByUserId?userId=${userId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (response.status === 200) {
                  setNotifications([]);
                  setUnreadCount(0);
                }
              } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                  handleUnauthorized(setIsLoggedIn, setToastMessage, router);
                }
              }
            }}
          >
            Remove all notifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
