import React from "react";

const Skeleton = ({ classname }) => {
  return <div className={`animate-pulse bg-gray-300 ${classname}`}></div>;
};

export default Skeleton;
