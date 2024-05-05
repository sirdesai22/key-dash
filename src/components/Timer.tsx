"use client";
import React, { MutableRefObject, useEffect, useState } from "react";
import { formatTime } from '../hooks/formatTime';

type Props = {
  started: boolean;
  time: MutableRefObject<number>;
  redirectStats: (newValue: number) => void;
  handleReset: () => void;
};

const Timer = (props: Props) => {

  const [displayTime, setDisplayTime] = useState(props.time.current)

  useEffect(() => {
    setDisplayTime(props.time.current)
    let intervalId: NodeJS.Timeout | undefined;
    if (props.started) {  
      intervalId = setInterval( async () => {
        props.time.current--;
        setDisplayTime((prev) => prev-1)

        if(props.time.current === 0){
          clearInterval(intervalId);
          props.redirectStats(displayTime)
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
