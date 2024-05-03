"use client";

import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DeliveryAnalytics from "@/app/components/DeliveryAnalytics";

const page = () => {
  const [riderId, setRiderId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = jwtDecode(token).sub;
      setRiderId(id);
    }
  }, []);

  return <DeliveryAnalytics riderId={riderId} />;
};

export default page;
