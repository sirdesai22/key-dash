"use client";
import Display from "./components/Display";
import { useEffect, useRef, useState } from "react";
import Timer from "./components/Timer";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [dummy, setDummy] = useState(0);
  const time = useRef(15)

  const statsRedirect = (newValue: number) => {
    time.current = newValue;
    console.log("Updated number:", time.current); // Log updated number
    window.location.href = "/stats";
  };

  const handleReset = () => {
    // props.setTime(60); // Reset timer
    setCounter(0);
    setDummy((prev) => prev+1)
    setStarted(false); // Reset started state
    time.current = 15; // Reset typing test counter
  };

  return (
    <>
      <div className=" w-full bg-[#252525] bg-dot-white/[0.6] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col justify-center items-center h-screen w-full z-10">
          <Timer started={started} time={time} statsRedirect={statsRedirect} handleReset={handleReset}/>
          <Display key={dummy} started={started} setStarted={setStarted} statsRedirect={statsRedirect} counter={counter} />
        </div>
      </div>
    </>
  );
}
