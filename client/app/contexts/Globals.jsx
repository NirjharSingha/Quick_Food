"use client";

import React, { createContext, useContext, useState } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(2000);

  return (
    <GlobalsContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
