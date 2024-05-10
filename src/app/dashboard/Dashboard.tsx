"use client";
import Navbar from "@/components/Navbar";
import { auth } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { LineChart } from "@mui/x-charts";

type Props = {};

const Dashboard = (props: Props) => {
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
            Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#252525] bg-dot-white/[0.6] relative flex flex-col justify-center items-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="z-10 w-full">
        <Navbar />
        
          <div className="w-full flex justify-center text-white">
            <LineChart
              xAxis={[
                {
                  data: [1,2,3,4,5,6,7,8,9,10], // dates of previous tries
                },
              ]}
              series={[
                {
                  data: [36, 41, 54, 52, 51, 60, 52], //actual WPM data
                  color: "rgb(234, 179, 8)",
                },
              ]}
              height={500}
              // leftAxis={null}
              // bottomAxis={null}
            />
          </div>

          <div className="flex justify-evenly">
            <div className="w-[200px] h-[200px] text-white"><span className="text-8xl font-semibold text-yellow-500">45</span><br />Avg. WPM</div>
            <div className="w-[200px] h-[200px] text-white"><span className="text-8xl font-semibold text-yellow-500">78%</span><br />Avg Accuracy</div>
            <div className="w-[200px] h-[200px] text-white"><span className="text-8xl font-semibold text-yellow-500">78%</span><br />Improvement %</div>
          </div>

      </div>
    </div>
  );
};

export default Dashboard;
