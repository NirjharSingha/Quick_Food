"use client";

import React, { useEffect } from "react";
import ResInfo from "@/app/components/ResInfo";
import { useGlobals } from "@/app/contexts/Globals";

const page = ({ params }) => {
  const { resId } = params;
  const { setMenu } = useGlobals();

  useEffect(() => {
    localStorage.setItem("restaurantId", resId);
    setMenu([]);
  }, [resId]);

  return <ResInfo resId={resId} />;
};

export default page;
