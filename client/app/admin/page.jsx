"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { MdDataset } from "react-icons/md";
import DeliveryHeader from "../components/DeliveryHeader";
import OrderDetailsTable from "../components/OrderDetailsTable";
import OrderDetailsCard from "../components/OrderDetailsCard";

const page = () => {
  const router = useRouter();
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const [showLoading, setShowLoading] = useState(false);

  return (
    <>
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showLoading && <div div className="w-full overflow-y-auto"></div>}
    </>
  );
};

export default page;
