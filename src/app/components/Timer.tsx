import React, { useEffect, useState } from "react";

type Props = {
  started: boolean;
  time: number;
};

const Timer = (props: Props) => {
  const [time, setTime] = useState(props.time);

  // useEffect(() => {
  //   console.log("first timer started");
  //   let intervalId: NodeJS.Timeout | undefined;

  //   if (props.started) {
  //     intervalId = setInterval(() => {
  //       setTime((prevTime) => prevTime - 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [props.started]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (props.started) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalId);
            return 0; // Stop the timer at 00:00
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [props.started]);

  useEffect(() => {
    setTime(props.time);
  }, [props.started]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="text-5xl font-semibold p-2 text-white">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
