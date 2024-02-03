import React from "react";
import FoodDelivery from "@/public/Food_Delivery.png";
import Image from "next/image";

const Landing = () => {
  return (
    <div
      className="w-screen bg-white"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      <div
        className="bg-slate-50 flex align-baseline"
        // style={{ height: "65vh" }}
      >
        <Image
          src={FoodDelivery}
          alt="logo"
          className="absolute right-0"
          style={{
            maxWidth: "40vw",
            height: "auto",
            aspectRatio: "1/1",
          }}
        />
        {/* <p
          className="absolute left-0"
          style={{
            minHeight: "100%",
            minWidth: "60vw",
          }}
        >
          paragraph
        </p> */}
      </div>
    </div>
  );
};

export default Landing;
