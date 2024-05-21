import React from "react";
import ChatCard from "@/app/components/ChatCard";

const page = () => {
  return (
    <div className="pt-4 pb-4 pl-1 pr-1 md:pl-3 md:pr-3 w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-[100%]  overflow-y-auto">
      <ChatCard />
    </div>
  );
};

export default page;
