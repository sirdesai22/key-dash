import React, { useEffect } from "react";

type StatData = {
  wpm: number;
  sec: number;
};

type Props = {
  head: string;
  wpm: number;
  speed: number;
};

const Card = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#ffae00ac] text-white text-xl font-bold w-72 h-64 rounded-md">
      <p className="uppercase text-emerald-500">{props.head}</p>
      <p className="text-black">WPM: {props.wpm}</p>
      <p>Speed: {props.speed}</p>
    </div>
  );
};

export default Card;
