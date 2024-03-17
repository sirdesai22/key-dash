"use client";
import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

type Props = {};

const Display = (props: Props) => {
  const [key, setKey] = useState("Press keys...");
  // const [captureKeys, setCaptureKeys] = useState<string[]>([]);
  const [captureKeys, setCaptureKeys] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(60);
  // const startedRef = useRef(false);
  const counterRef = useRef(0);

  const text: String =
    "A simple typing test is an effective tool for improving typing speed and accuracy. It typically presents users with a passage of text and prompts them to type it as quickly and accurately as possible within a specified time limit. As users type, the test tracks their speed, accuracy, and any errors made. At the end of the test, users receive feedback on their performance, including words per minute (WPM), accuracy percentage, and a breakdown of any mistakes made. Typing tests are commonly used for training purposes, skill assessment, and even as a fun way to challenge oneself or compete with others.";
  // var counter: number = 0;

  useEffect(() => {
    // setCaptureKeys(Array.from(text));
    const spans = text
      .split("")
      .map(
        (char, index) =>
          `<span key=${index} style="margin: 0 1px;">${char}</span>`
      );
    // Store the array of <span> elements in state
    setCaptureKeys(spans.join(""));
    // console.log("captureKeys:", captureKeys);
  }, [text]);

  useEffect(() => {
    // var isEnter: boolean = false;
    const captureKeydown = (event: KeyboardEvent) => {
      // if(!started && counter===1) setStarted(true);
      const keyPressed = event.key;

      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);

      if (!started) {
        setStarted(true);
        // console.log(startedRef.current);
      }
      if (isAlphabetic) {
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counterRef.current < spanElements.length) {
          const span = spanElements[counterRef.current] as HTMLElement;
          const nextSpan = spanElements[counterRef.current + 1] as HTMLElement;
          nextSpan.style.textDecoration = "underline";
          if (keyPressed === span.innerHTML) {
            span.style.color = "yellow";
            span.style.textDecoration = "none";
          }else {
            span.style.color = "red";
            // span.style.borderRadius = "4px";
            span.style.textDecoration = "none";
            // span.style.background = "rgb(252, 165, 165)";
          }
          counterRef.current++;
        }
      }

      if (keyPressed === "Backspace") {
        // console.log("Backspace key pressed");
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

    // window.addEventListener("keydown", captureKeydown);

    return () => {
      // Remove the event listener when the component unmounts
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", captureKeydown);
      }
    };
  }, []);

  const handleReset = () => {
    setTime(60); // Reset timer
    setStarted(false); // Reset started state
    counterRef.current = 0; // Reset typing test counter
  }

  return (
    <>
      <div className="flex justify-between w-4/5 items-center text-white">
        {started ? (
          <button onClick={handleReset} className="bg-gradient-to-br from from-red-400 to-red-900 font-semibold px-7 rounded-md py-3">
            Reset
          </button>
        ) : (
          <p className="ml-2 text-2xl font-mono font-semibold">
            Press ENTER to start...
          </p>
        )}
        <Timer started={started} time={time}/>
      </div>
      <div
        className="p-5 border-2 w-4/5 overflow-hidden font-semibold rounded-lg shadow-lg bg-gray-800 text-slate-500 text-4xl textBox bgred font-mono"
        dangerouslySetInnerHTML={{ __html: captureKeys as string }}
      ></div>
    </>
  );
};

export default Display;
