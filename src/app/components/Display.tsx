"use client"
import React, { useEffect, useState } from "react";

type Props = {};

const Display = (props: Props) => {
  const [key, setKey] = useState("");
  useEffect(() => {
    function captureKeydown(event: KeyboardEvent){
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.]$/.test(keyPressed);
      if (isAlphabetic) setKey(event.key);
    }

    window.addEventListener("keydown", captureKeydown);
  }, []);
  return (
    <div className="p-10 border-2 w-4/5 h-3/5 flex justify-center items-center text-9xl font-semibold rounded-lg shadow-lg bg-sky-100">
      {key}
    </div>
  );
};

export default Display;
