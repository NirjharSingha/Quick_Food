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
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
