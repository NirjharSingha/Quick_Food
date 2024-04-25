import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useGlobals } from "../contexts/Globals";
import { useEffect, useRef } from "react";

const Cross = () => {
  const { setShowSideBar, sideBarRef } = useGlobals();
  const crossRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        if (crossRef.current && !crossRef.current.contains(event.target)) {
          setShowSideBar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={crossRef}>
      <RxCross2
        className="text-2xl md:text-3xl text-gray-700 cursor-pointer"
        onClick={() => setShowSideBar(false)}
      />
    </div>
  );
};

export default Cross;

// responsive
