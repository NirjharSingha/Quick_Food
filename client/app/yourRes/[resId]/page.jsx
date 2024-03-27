"use client";

import React, { useEffect } from "react";
import ResInfo from "@/app/components/ResInfo";

const page = ({ params }) => {
  const { resId } = params;

  useEffect(() => {
    localStorage.setItem("restaurantId", resId);
  }, [resId]);

  return <ResInfo resId={resId} />;
};

export default page;
