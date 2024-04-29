import React from "react";
import ResAnalytics from "@/app/components/ResAnalytics";

const page = ({ params }) => {
  const { id } = params;
  return <ResAnalytics resId={id} />;
};

export default page;
