"use client";
import { uptime } from "process";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";

type Props = {
  started: boolean;
  time: MutableRefObject<number>;
  // setTime: Dispatch<SetStateAction<number>>
  statsRedirect: (newValue: number) => void;
  handleReset: () => void;
};

const Timer = (props: Props) => {

  const [displayTime, setDisplayTime] = useState(props.time.current)

  useEffect(() => {
    setDisplayTime(props.time.current)
    let intervalId: NodeJS.Timeout | undefined;
    if (props.started) {
      intervalId = setInterval(() => {
        props.time.current--;
        setDisplayTime((prev) => prev-1)
        console.log("before zero")
        // ((prevTime) => {
        //   if (prevTime > 0) {
        //     return prevTime - 1;
        //   } else {
        //     clearInterval(intervalId);
        //     // sendData();
            
        //     return 0; // Stop the timer at 00:00
        //   }
        if(props.time.current === 0){
          props.statsRedirect(props.time.current)
          clearInterval(intervalId);
          return 0; 
        };
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [props.started]);

  // useEffect(() => {
  //   props.setTime(time);
  // }, [props.started]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-between w-4/5 items-center text-white">
      <div>
        {props.started ? (
          <button
            onClick={props.handleReset}
            className="bg-gradient-to-br from from-red-400 to-red-900 font-semibold px-7 rounded-md py-3"
          >
            Reset
          </button>
        ) : (
          <p className="ml-2 text-2xl font-mono font-semibold">
            Press ENTER to start...
          </p>
        )}
      </div>
      <div className="text-5xl font-semibold p-2 text-white">
        {formatTime(displayTime)}
      </div>
    </div>
  );
};

export default Timer;
