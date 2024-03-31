import React from "react";
import Lottie from "lottie-react";
import loading from "@/app/animations/loading.json";

const Loading = () => {
  return (
    <Lottie animationData={loading} className="w-[2.5rem] h-[2.5rem] m-auto" />
  );
};

export default Loading;
