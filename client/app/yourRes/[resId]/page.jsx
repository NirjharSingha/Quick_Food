import React from "react";
import ResInfo from "@/app/components/ResInfo";

const page = ({ params }) => {
  const { resId } = params;
  return <ResInfo resId={resId} />;
};

export default page;
