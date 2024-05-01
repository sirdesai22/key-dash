import React, { useEffect } from "react";
import { IoIosTimer } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
type StatData = {
  data: any;
};

type Props = {
  head: string;
  data: any;
};

const Card = (props: Props) => {
  
  return (
    <div className="flex flex-col items-end">
      <p className="text-yellow-500 text-9xl font-bold">{props.data}</p>
      <p className="uppercase text-white text-3xl font-bold">{props.head}</p>
    </div>
  );
};

export default Card;
