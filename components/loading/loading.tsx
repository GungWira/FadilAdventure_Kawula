import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-[#F6F6F4] gap-4 z-50 flex flex-col justify-center items-center fixed top-0 left-0">
      <video
        src="/loading-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-40 brightness-100"
      ></video>
      <p>Loading Data ...</p>
    </div>
  );
}
