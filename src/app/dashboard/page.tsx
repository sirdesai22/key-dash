"use client";
import Navbar from "@/components/Navbar";
import { auth } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [user, setUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });

  if (!user) {
    return (
      <div className="h-screen w-full bg-[#252525] bg-dot-white/[0.6] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="z-10 w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-8xl text-white font-bold">
            Register as a <span className="text-yellow-500">KeyDasher</span>
          </h1>
          <button
            className="bg-white px-8 py-2 rounded-md font-semibold text-xl"
            onClick={() => {
              window.location.href = "/auth/signup";
            }}
          >
            Let's go!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#252525] bg-dot-white/[0.6] relative flex flex-col">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="z-10 w-full">
        <Navbar />
        dashboard
      </div>
    </div>
  );
};

export default page;
