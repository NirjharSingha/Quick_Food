import React from "react";

const Stepper = ({ step }) => {
  return (
    <div className="w-full bg-slate-100 shadow-sm shadow-gray-300 rounded-md mt-3">
      <div className="flex justify-between items-center pt-3 pl-10 pr-10 pb-1">
        <div
          className={`flex justify-center items-center ${
            step >= 0 ? "bg-green-600 text-white" : "bg-slate-200"
          } rounded-full w-10 h-10 text-sm font-bold`}
        >
          1
        </div>
        <div
          className={`h-[3px] ${
            step >= 1 ? "bg-green-500" : "bg-gray-400"
          } rounded`}
          style={{ width: "calc((100% - 10rem)/3)" }}
        />
        <div
          className={`flex justify-center items-center ${
            step >= 1 ? "bg-green-600 text-white" : "bg-slate-200"
          } rounded-full w-10 h-10 text-sm font-bold`}
        >
          2
        </div>
        <div
          className={`h-[3px] ${
            step >= 2 ? "bg-green-500" : "bg-gray-400"
          } rounded`}
          style={{ width: "calc((100% - 10rem)/3)" }}
        />
        <div
          className={`flex justify-center items-center ${
            step >= 2 ? "bg-green-600 text-white" : "bg-slate-200"
          } rounded-full w-10 h-10 text-sm font-bold`}
        >
          3
        </div>
        <div
          className={`h-[3px] ${
            step >= 3 ? "bg-green-500" : "bg-gray-400"
          } rounded`}
          style={{ width: "calc((100% - 10rem)/3)" }}
        />
        <div
          className={`flex justify-center items-center ${
            step >= 3 ? "bg-green-600 text-white" : "bg-slate-200"
          } rounded-full w-10 h-10 text-sm font-bold`}
        >
          4
        </div>
      </div>
      <div className="flex justify-between p-3 pt-0">
        <div
          className={`flex justify-center items-center rounded-sm w-[6rem] max-w-[20%] h-12 text-sm ${
            step >= 0 ? "text-gray-800" : "text-gray-400"
          } text-center`}
        >
          Order
          <br />
          Placed
        </div>
        <div
          className={`flex justify-center items-center rounded-sm w-[6rem] max-w-[20%] h-12 text-sm ${
            step >= 1 ? "text-gray-800" : "text-gray-400"
          } text-center`}
        >
          Delivery
          <br />
          Received
        </div>
        <div
          className={`flex justify-center items-center rounded-sm w-[6rem] max-w-[20%] h-12 text-sm ${
            step >= 2 ? "text-gray-800" : "text-gray-400"
          } text-center`}
        >
          Customer
          <br />
          Notified
        </div>
        <div
          className={`flex justify-center items-center rounded-sm w-[6rem] max-w-[20%] h-12 text-sm ${
            step >= 3 ? "text-gray-800" : "text-gray-400"
          } text-center`}
        >
          Delivery
          <br />
          Complete
        </div>
      </div>
    </div>
  );
};

export default Stepper;
