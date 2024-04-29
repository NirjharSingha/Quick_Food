"use client";

import React, { useEffect, useState } from "react";
import ResAnalytics from "@/app/components/ResAnalytics";

const page = () => {
  const [resId, setResId] = useState("");

  useEffect(() => {
    const resId = localStorage.getItem("restaurantId");
    setResId(resId);
  }, []);

  return <ResAnalytics resId={resId} />;
};

export default page;

// responsive
