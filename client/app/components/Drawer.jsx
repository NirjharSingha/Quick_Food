import React from "react";

const Drawer = () => {
  return (
    <div
      className="w-52 bg-gray-400 shadow-xl p-4 fixed top-[4rem] right-0 overflow-y-auto z-10 scrollNone drawerAnimation"
      style={{
        height: "calc(100svh - 4rem)",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <button className="btn w-full mb-2 truncate"></button>
      <button className="btn w-full mb-2 truncate"></button>
      <button className="btn w-full mb-2 truncate"></button>
      <button className="btn w-full mb-2 truncate"></button>
      <button className="btn w-full mb-2 truncate"></button>
      <button className="btn w-full mb-2 truncate"></button>
    </div>
  );
};

export default Drawer;
