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
import { IoMdMenu } from "react-icons/io";
import Cross from "./Cross";
import { handleUnauthorized } from "../utils/unauthorized";
import NotificationPopUp from "./NotificationPopUp";
import Otp from "./Otp";

const NavBar = () => {
  const router = useRouter();
  const {
    windowWidth,
    setWindowWidth,
    setIsLoggedIn,
    isLoggedIn,
    toastMessage,
    setToastMessage,
    toastRef,
    role,
    setRole,
    setCartCount,
    setStompClient,
    unSeenNotifications,
    setUnSeenNotifications,
    setShowSideBar,
    showSideBar,
    setIsTyping,
    setChatUsers,
    setChats,
    setShowUnreadBar,
    showOtp,
    setShowOtp,
  } = useGlobals();
  const pathname = usePathname();
  const [showPopUp, setShowPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const fetchChatById = async (chatId, roomId, stompClient, dataChat) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/getChatById?chatId=${chatId}&roomId=${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        const fetchedChat = response.data;
        setChats((prevChats) => {
          const chatIndex = prevChats.findIndex(
            (chat) => chat.id === fetchedChat.id
          );

          if (chatIndex !== -1) {
            // If chat is found, replace it at the same index
            return [
              ...prevChats.slice(0, chatIndex),
              fetchedChat,
              ...prevChats.slice(chatIndex + 1),
            ];
          } else {
            // If chat is not found, add it at index 0
            return [fetchedChat, ...prevChats];
          }
        });

        setShowUnreadBar(false);
        const destination = "/user/" + fetchedChat.senderId + "/queue";
        let redirectUrl;
        const role = localStorage.getItem("role");
        if (role === "RIDER") {
          redirectUrl = `/orderFood/chat/${dataChat.roomId}`;
        } else {
          redirectUrl = "/delivery/chat";
        }
        let dataToSend = {
          title: "Chat",
          topic: "seen",
          chat: dataChat,
          redirectUrl: redirectUrl,
        };
        stompClient.send(destination, {}, JSON.stringify(dataToSend));
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      } else if (error.response.status === 404) {
        setToastMessage(
          "The chat room is already dissolved as the order is delivered"
        );
        const role = localStorage.getItem("role");
        if (role === "USER") {
          router.push("/orderFood/chat");
        } else {
          router.push("/delivery");
        }
      }
    }
  };

  const getUnseenNotifications = async () => {
    if (localStorage.getItem("token")) {
      const userId = jwtDecode(localStorage.getItem("token")).sub;
      try {
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
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
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
              "/user/" + userId + "/queue",
              function (response) {
                const data = JSON.parse(response.body);

                if (data.title === "Notification") {
                  setTitle("New Notification!");
                  setText(data.notification);
                  setRedirectUrl("/myAccount/notifications");
                  setShowPopUp(true);
                  setUnSeenNotifications((prev) => prev + 1);
                } else if (data.title === "Typing") {
                  setIsTyping(data.typing);
                } else if (data.title === "Chat") {
                  const fullUrl = window.location.href;
                  const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

                  // Remove the base URL from the full URL to get the relative path
                  const relativePath = fullUrl.replace(baseUrl, "");

                  // Ensure the relative path starts with a '/'
                  const pathname = relativePath.startsWith("/")
                    ? relativePath
                    : "/" + relativePath;
                  if (data.redirectUrl !== pathname) {
                    if (data.topic === "add" || data.topic === "reaction") {
                      setTitle("Chat Notification!");
                      setText(data.notificationMessage);
                      setRedirectUrl(data.redirectUrl);
                      setShowPopUp(true);
                    }
                    if (
                      pathname === "/orderFood/chat" &&
                      data.topic === "add"
                    ) {
                      setChatUsers((prevChatUsers) => {
                        const newChat = data.chat;
                        const existingUserIndex = prevChatUsers.findIndex(
                          (chatUser) => chatUser.roomId === newChat.roomId
                        );

                        if (existingUserIndex !== -1) {
                          // Room already exists
                          const updatedChatUser = {
                            ...prevChatUsers[existingUserIndex],
                            unseenCount:
                              prevChatUsers[existingUserIndex].unseenCount + 1,
                          };
                          const updatedChatUsers = [
                            updatedChatUser,
                            ...prevChatUsers.filter(
                              (_, index) => index !== existingUserIndex
                            ),
                          ];
                          return updatedChatUsers;
                        }
                      });
                    }
                  } else {
                    const topic = data.topic;
                    if (topic === "add" || topic === "update") {
                      fetchChatById(
                        data.chat.id,
                        data.chat.roomId,
                        stompClient,
                        data.chat
                      );
                    } else if (topic === "delete") {
                      setChats((prevChats) => {
                        return prevChats.filter(
                          (chat) => chat.id !== data.chat.id
                        );
                      });
                      setShowUnreadBar(false);
                    } else if (topic === "reaction") {
                      setChats((prevChats) => {
                        const chatIndex = prevChats.findIndex(
                          (chat) => chat.id === data.chat.id
                        );

                        if (chatIndex === -1) {
                          // If chat not found, return the previous state
                          return prevChats;
                        }

                        // Create a new chat object with the updated reaction
                        const updatedChat = {
                          ...prevChats[chatIndex],
                          reaction: data.chat.reaction,
                        };

                        // Return the new state with the updated chat
                        return [
                          ...prevChats.slice(0, chatIndex),
                          updatedChat,
                          ...prevChats.slice(chatIndex + 1),
                        ];
                      });
                    } else if (topic === "seenAll") {
                      const userId = jwtDecode(
                        localStorage.getItem("token")
                      ).sub;
                      setChats((prevChats) =>
                        prevChats.map((chat) =>
                          chat.senderId === userId
                            ? { ...chat, isSeen: true }
                            : chat
                        )
                      );
                    } else if (topic === "seen") {
                      setChats((prevChats) => {
                        return prevChats.map((chat) => {
                          return chat.id === data.chat.id
                            ? { ...chat, isSeen: true }
                            : chat;
                        });
                      });
                    }
                  }
                }
              }
            );
          });
          setStompClient(stompClient);
        });
      });
    }

    const otpObject = JSON.parse(localStorage.getItem("otpObject"));
    if (otpObject !== undefined && otpObject !== null) {
      setShowOtp(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUnseenNotifications();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 900) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
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
      {showOtp && <Otp />}
      <div style={{ display: "none" }}>
        <Toast />
      </div>
      {showPopUp && (
        <div className="absolute top-[4.01rem] left-0 right-0 min-w-[75%] lg:min-w-[60%] sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50">
          <NotificationPopUp
            title={title}
            text={text}
            setShow={setShowPopUp}
            redirectUrl={redirectUrl}
          />
        </div>
      )}
      <div
        className={`flex items-center w-full ${
          windowWidth < 530 ? "h-[3.3rem]" : "h-[4rem]"
        } bg-base-100 sticky`}
        style={{ backgroundColor: "#d6c5b7" }}
      >
        <div
          className={`flex items-center ${
            windowWidth >= 700 ? "ml-4" : windowWidth >= 400 ? "ml" : "ml-0"
          } w-[50%] justify-start`}
        >
          {windowWidth > 900 || pathname === "/" ? (
            <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white">
              <Image src={FavIcon} alt="logo" width={30} />
            </div>
          ) : !showSideBar ? (
            <IoMdMenu
              className="text-2xl md:text-3xl text-gray-700 cursor-pointer"
              onClick={() => setShowSideBar(true)}
            />
          ) : (
            <Cross />
          )}
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
            className={`shrink-0 flex justify-between ${
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
              } ${pathname === "/" ? "text-blue-600" : ""}`}
            >
              Home
            </Link>
            {isLoggedIn && role === "USER" && (
              <>
                <Link
                  href="/orderFood"
                  className={`cursor-pointer hover:underline ${
                    windowWidth < 530 ? "text-[0.8rem]" : ""
                  } ${pathname.includes("/orderFood") ? "text-blue-600" : ""}`}
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
                  } ${pathname.includes("/yourRes") ? "text-blue-600" : ""}`}
                >
                  Your Restaurant
                </Link>
              </>
            )}
            {isLoggedIn && role === "RIDER" && (
              <Link
                href="/delivery"
                className={`cursor-pointer hover:underline ${
                  windowWidth < 530 ? "text-[0.8rem]" : ""
                } ${pathname.includes("/delivery") ? "text-blue-600" : ""}`}
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
              <Link
                href="/admin"
                className={`cursor-pointer hover:underline ${
                  windowWidth < 530 ? "text-[0.8rem]" : ""
                } ${pathname.includes("/admin") ? "text-blue-600" : ""}`}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        )}
        <div
          className="flex items-center justify-end w-[50%] ml-auto"
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

// responsive
