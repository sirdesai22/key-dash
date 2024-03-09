import React, { useEffect, useState } from "react";

type Props = {
  started: boolean;
};

const Timer = (props: Props) => {
  const [time, setTime] = useState(120);
  // const [started, setStarted] = useState(false)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (props.started) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [props.started]);

  return (
  <>
  {
    time>=60
    ?
    <div className="text-5xl font-semibold">{(time)}:{time%60}</div>
    :
    <div className="text-5xl font-semibold">00:{time}</div>
  }
  </>
  )
};

export default Timer;
