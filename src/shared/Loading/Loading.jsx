import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center bg-base-100">
      <span className="loading loading-bars loading-xl"></span>
      <p className="mt-4 text-md font-medium animate-pulse">Preparing your food...</p>
    </div>
  );
};

export default Loading;

