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
import {
  requestForToken,
  firebaseConfig,
  onMessageListener,
} from "../utils/firebase";
import { initializeApp } from "firebase/app";

const NavBar = () => {
  const router = useRouter();
  const {
    windowWidth,
    setWindowWidth,
    setIsLoggedIn,
    isLoggedIn,
    toastMessage,
    toastRef,
  } = useGlobals();

  useEffect(() => {
    initializeApp(firebaseConfig);
    requestForToken();

    onMessageListener().then((payload) => {
      window.alert("Payload: " + JSON.stringify(payload));
    });
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));

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
        <div className="flex items-center ml-4 navbar-start">
          <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white">
            <Image src={FavIcon} alt="logo" width={30} />
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl text-gray-700 font-bold">
              QuickFood
            </a>
          </div>
        </div>
        {!isLoggedIn && <></>}
        {isLoggedIn && (
          <div className="navbar-center flex justify-between gap-6 font-semibold font-sans text-gray-700 items-center">
            <Link href="/" className="cursor-pointer hover:underline">
              Home
            </Link>
            <Link href="/orderFood" className="cursor-pointer hover:underline">
              Order Food
            </Link>
            <Link href="/yourRes" className="cursor-pointer hover:underline">
              Your Restaurants
            </Link>
          </div>
        )}
        <div className="navbar-end">
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
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <label className="cursor-pointer grid place-items-center">
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
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
