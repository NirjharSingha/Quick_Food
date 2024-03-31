"use client";

import React, { createContext, useContext, useState, useRef } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(2000);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [resInfoPercentage, setResInfoPercentage] = useState(0);
  const [menu, setMenu] = useState([]);
  const menuDivRef = useRef(null);

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
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
