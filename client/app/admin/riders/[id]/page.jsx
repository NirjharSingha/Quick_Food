import React from "react";
import DeliveryAnalytics from "@/app/components/DeliveryAnalytics";

const page = ({ params }) => {
  const { id } = params;
  return <DeliveryAnalytics riderId={id} />;
};

export default page;

// responsive
