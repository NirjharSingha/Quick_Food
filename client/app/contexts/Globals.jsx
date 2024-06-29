"use client";

import React, { createContext, useContext, useState, useRef } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(2000);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState("");
  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [resInfoPercentage, setResInfoPercentage] = useState(0);
  const [menu, setMenu] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const menuDivRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [unSeenNotifications, setUnSeenNotifications] = useState(0);
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatUsers, setChatUsers] = useState([]);
  const [chats, setChats] = useState([]);

  return (
    <GlobalsContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
        isLoggedIn,
        setIsLoggedIn,
        toastMessage,
        setToastMessage,
        toastRef,
        profilePercentage,
        setProfilePercentage,
        resInfoPercentage,
        setResInfoPercentage,
        menu,
        setMenu,
        menuDivRef,
        cartCount,
        setCartCount,
        role,
        setRole,
        stompClient,
        setStompClient,
        unSeenNotifications,
        setUnSeenNotifications,
        showSideBar,
        setShowSideBar,
        sideBarRef,
        isTyping,
        setIsTyping,
        chatUsers,
        setChatUsers,
        chats,
        setChats,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
