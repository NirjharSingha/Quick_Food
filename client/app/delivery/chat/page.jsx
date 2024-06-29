"use client";

import React from "react";
import ChatRoom from "@/app/components/ChatRoom";
import { useEffect, useState } from "react";

const page = () => {
  const [roomId, setRoomId] = useState(-1);

  useEffect(() => {
    const deliveryStatus = JSON.parse(localStorage.getItem("deliveryStatus"));
    // const roomId = deliveryStatus.orderId;
    const roomId = 1;
    setRoomId(roomId);
  }, []);

  return <ChatRoom roomId={roomId} />;
};

export default page;
