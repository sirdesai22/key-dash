"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const Display = (props: Props) => {
  const [key, setKey] = useState("Press keys...");
  const [captureKeys, setcaptureKeys] = useState<string[]>([]);

  useEffect(() => {
    function captureKeydown(event: KeyboardEvent) {
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);
      if (isAlphabetic) {
        setKey(event.key);
        setcaptureKeys((prevData) => [...prevData, keyPressed]);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", captureKeydown);
    }

    // window.addEventListener("keydown", captureKeydown);

    return () => {
      // Remove the event listener when the component unmounts
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", captureKeydown);
      }
    };

  }, []);
  return (
    <>
      <div className="font-semibold text-3xl">{captureKeys}</div>
      <div className="p-10 border-2 w-4/5 h-3/5 flex justify-center items-center text-9xl font-semibold rounded-lg shadow-lg bg-sky-100">
        {key}
      </div>
    </>
  );
};

export default Display;
