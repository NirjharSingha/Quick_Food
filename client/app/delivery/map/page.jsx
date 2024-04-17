import React from "react";
import GoogleApi from "@/app/components/GoogleApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import DeliveryHeader from "@/app/components/DeliveryHeader";

const page = () => {
  return (
    <div div className="w-full overflow-y-auto">
      <DeliveryHeader />
      <div className="p-4 w-full">
        <div className="flex justify-center items-center mb-5 mt-4">
          <FaMapMarkerAlt className="mr-2 text-6xl text-gray-700" />
          <p className="font-serif text-4xl font-bold text-gray-700 mt-4">
            Map
          </p>
        </div>
        <div className="w-[90%] mx-auto shadow-md shadow-gray-400 rounded-lg bg-slate-100">
          <GoogleApi />
        </div>
      </div>
    </div>
  );
};

export default page;
