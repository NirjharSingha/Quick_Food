"use client";

import React from "react";
import ChatRoom from "@/app/components/ChatRoom";

const page = ({ params }) => {
  const { roomId } = params;
  return <ChatRoom roomId={roomId} />;
};

export default page;
