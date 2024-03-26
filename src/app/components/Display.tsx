"use client";
import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import texts from "@/SampleTexts/easyTexts";
import { renderTexts } from "../hooks/renderTexts";

type Props = {};

const Display = (props: Props) => {
  // const [key, setKey] = useState("Press keys...");
  const [captureKeys, setCaptureKeys] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(5);

  const counterRef = useRef(0);

  // Render texts 
  useEffect(() => {
    setCaptureKeys(renderTexts);
  }, [texts]);

  // Check correct and wrongs keys on keyboard events
  useEffect(() => {
    const captureKeydown = (event: KeyboardEvent) => {
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);

      if (!started) {
        setStarted(true);
      }
      if (isAlphabetic) {
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counterRef.current < spanElements.length-1) {
          const span = spanElements[counterRef.current] as HTMLElement;
          const nextSpan = spanElements[counterRef.current + 1] as HTMLElement;
          nextSpan.style.textDecoration = "underline";
          if (keyPressed === span.innerHTML) {
            span.style.color = "yellow";
            span.style.textDecoration = "none";
          } else {
            span.style.color = "red";
            span.style.textDecoration = "none";
          }
          counterRef.current++;
        }
      }

      if (keyPressed === "Backspace") {
        counterRef.current--;
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counterRef.current < spanElements.length) {
          const span = spanElements[counterRef.current] as HTMLElement;
          const nextSpan = spanElements[counterRef.current + 1] as HTMLElement;
          nextSpan.style.textDecoration = "none";

          span.style.color = "#64748b";
          span.style.textDecoration = "underline";
        }
      }
    };


    if (typeof window !== "undefined") {
      window.addEventListener("keydown", captureKeydown);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", captureKeydown);
      }
    };
  }, []);

  const handleReset = () => {
    setTime(60); // Reset timer
    setStarted(false); // Reset started state
    counterRef.current = 0; // Reset typing test counter
  };

  return (
    <>
      <div className="flex justify-between w-4/5 items-center text-white">
        {started ? (
          <button
            onClick={handleReset}
            className="bg-gradient-to-br from from-red-400 to-red-900 font-semibold px-7 rounded-md py-3"
          >
            Reset
          </button>
        ) : (
          <p className="ml-2 text-2xl font-mono font-semibold">
            Press ENTER to start...
          </p>
        )}
        <Timer started={started} time={time} />
      </div>
      <div
        className="p-5 border-2 w-4/5 overflow-hidden font-semibold rounded-lg shadow-lg bg-gray-800 text-slate-500 text-4xl textBox bgred font-mono"
        dangerouslySetInnerHTML={{ __html: captureKeys as string }}
      ></div>
    </>
  );
};

export default Display;
