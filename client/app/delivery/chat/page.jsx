"use client";

import React from "react";
import ChatRoom from "@/app/components/ChatRoom";
import { useEffect, useState } from "react";

const page = () => {
  const [roomId, setRoomId] = useState(-1);

  useEffect(() => {
    const deliveryStatus = JSON.parse(localStorage.getItem("deliveryStatus"));
    if (deliveryStatus) {
      const roomId = deliveryStatus.orderId;
      setRoomId(roomId);
    }
  }, []);

  return (
    <>
      {roomId !== -1 ? (
        <ChatRoom roomId={roomId} />
      ) : (
        <p className="text-md font-serif text-gray-700 w-full h-full flex justify-center items-center">
          No Chat Room Available Now
        </p>
      )}
    </>
  );
};

export default page;
