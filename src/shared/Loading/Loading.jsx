import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <span className="loading loading-ring loading-lg text-primary"></span>
      <p className="mt-4 text-md font-medium animate-pulse">Preparing your food...</p>
    </div>
  );
};

export default Loading;

