"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";

type Props = {};

type StatData = {
  data: any;
};

const Stats = (props: Props) => {
  const [data, setData] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchWPM = async () => {
      try {
        const res = await fetch("/api/wpm");
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWPM();
  }, []);

  // useEffect(() => {
  //   console.log(data); // This will log the updated data state whenever it changes
  // }, [data]);

  const [user, setUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });

  return (
    <>
      <div className=" w-full bg-[#252525] h-screen bg-dot-white/[0.6] relative flex flex-col items-center justify-center text-white gap-5">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {
          user
          ?<Navbar />
          :<></>
        }
        <div className="flex flex-wrap gap-5 justify-evenly items-center w-full z-10">
          {Object.entries(data).map(([key, d]) => (
            <Card key={key} head={key} data={d.data} />
          ))}
        </div>

        <div className="p-5">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="px-4 py-2 rounded-lg bg-gray-800 text-yellow-400 text-xl font-semibold border-2 border-white"
          >
            Retake test
          </button>
        </div>

        {user ? (
          <></>
        ) : (
          <Link
            href={"/auth/signup"}
            className="text-xl underline text-yellow-300 bg-[#ff5e0057] rounded-full px-3"
          >
            Sign in to save your result
          </Link>
        )}
      </div>
    </>
  );
};

export default Stats;
