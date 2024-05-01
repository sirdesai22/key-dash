"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";

type Props = {};

type StatData = {
  data: any;
};

const Stats = (props: Props) => {
  const [data, setData] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchWPM = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/wpm");
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWPM();
  }, []);

  useEffect(() => {
    console.log(data); // This will log the updated data state whenever it changes
  }, [data]);

  return (
    <>
      <div className=" w-full bg-[#252525] bg-dot-white/[0.6] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-wrap gap-5 justify-evenly items-center h-screen w-full z-10">
          {/* {
            data.map((d, index)=> (
              <Card key={index} data={d} />
            ))
          } */}

          {Object.entries(data).map(([key, d]) => (
            <Card key={key} head={key} data={d.data} /> 
          ))}
        </div>
      </div>
    </>
  );
};

export default Stats;
