"use client";

import React from "react";
import { useGlobals } from "../contexts/Globals";
import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import FavIcon from "@/public/favicon.ico";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const NavBar = () => {
  const router = useRouter();
  const {
    windowWidth,
    setWindowWidth,
    setIsLoggedIn,
    isLoggedIn,
    toastMessage,
    toastRef,
    role,
    setRole,
    setCartCount,
    setStompClient,
    unSeenNotifications,
    setUnSeenNotifications,
  } = useGlobals();
  const pathname = usePathname();

  const getUnseenNotifications = async () => {
    if (localStorage.getItem("token")) {
      const userId = jwtDecode(localStorage.getItem("token")).sub;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notification/getUnseenNotificationCount?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUnSeenNotifications(response.data);
        console.log(response.data);
      }
    }
  };

  useEffect(() => {
    // Only execute this code in the browser environment
    const inLoggedIn = localStorage.getItem("isLoggedIn");
    if (typeof window !== "undefined" && inLoggedIn) {
      import("sockjs-client").then(({ default: SockJS }) => {
        import("stompjs").then(({ over }) => {
          const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws`);
          const stompClient = over(socket);
          stompClient.connect({}, function () {
            const userId = jwtDecode(localStorage.getItem("token")).sub;
            stompClient.subscribe(
              "/user/" + userId + "/notifications",
              function (notification) {
                alert(notification.body);
                setUnSeenNotifications((prev) => prev + 1);
              }
            );
          });
          setStompClient(stompClient);
        });
      });
    }

    if (isLoggedIn) {
      getUnseenNotifications();
    }
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    setRole(localStorage.getItem("role"));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (toastMessage !== "") {
      toastRef && toastRef.current && toastRef.current.click();
    }
  }, [toastMessage]);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  return (
    <>
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          isUserLogin={isUserLogin}
        />
      )}
      {showSignUp && (
        <SignUp setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
      )}
      <div style={{ display: "none" }}>
        <Toast />
      </div>
      <div
        className="navbar h-[4rem] bg-base-100 sticky"
        style={{ backgroundColor: "#d6c5b7" }}
      >
        <div
          className={`flex items-center ${
            windowWidth >= 700 ? "ml-4" : windowWidth >= 400 ? "ml" : "ml-0"
          } navbar-start`}
        >
          <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white">
            <Image src={FavIcon} alt="logo" width={30} />
          </div>
          {windowWidth >= 800 && (
            <div className="flex-1">
              <a className="btn btn-ghost text-xl text-gray-700 font-bold">
                QuickFood
              </a>
            </div>
          )}
        </div>
        {!isLoggedIn && <></>}
        {isLoggedIn && (
          <div
            className={`navbar-center flex justify-between ${
              windowWidth > 500
                ? "gap-6"
                : windowWidth > 350
                ? "gap-3"
                : "gap-2"
            } font-semibold font-sans text-gray-700 items-center`}
          >
            <Link
              href="/"
              className={`cursor-pointer hover:underline ${
                windowWidth < 530 ? "text-[0.8rem]" : ""
              }`}
            >
              Home
            </Link>
            {isLoggedIn && role === "USER" && (
              <>
                <Link
                  href="/orderFood"
                  className={`cursor-pointer hover:underline ${
                    windowWidth < 530 ? "text-[0.8rem]" : ""
                  }`}
                  onClick={() => {
                    if (!pathname.includes("/orderFood")) {
                      localStorage.removeItem("cart");
                      setCartCount(0);
                    }
                  }}
                >
                  Order Now
                </Link>
                <Link
                  href="/yourRes"
                  className={`cursor-pointer hover:underline ${
                    windowWidth < 530 ? "text-[0.8rem]" : ""
                  }`}
                >
                  Your Restaurant
                </Link>
              </>
            )}
            {isLoggedIn && role === "RIDER" && (
              <Link
                href="/delivery"
                className="cursor-pointer hover:underline"
                onClick={() => {
                  if (!pathname.includes("/delivery")) {
                    localStorage.removeItem("deliveryStatus");
                  }
                }}
              >
                Delivery
              </Link>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <Link href="/delivery" className="cursor-pointer hover:underline">
                Admin Dashboard
              </Link>
            )}
          </div>
        )}
        <div
          className="navbar-end"
          style={windowWidth < 350 ? { width: "35%" } : {}}
        >
          {windowWidth >= 550 && (
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item w-[.8rem] h-[.8rem] p-0">
                  {unSeenNotifications > 0 ? unSeenNotifications : ""}
                </span>
              </div>
            </button>
          )}
          <Dropdown
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
            setIsUserLogin={setIsUserLogin}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
