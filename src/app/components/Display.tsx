"use client";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

type Props = {};

const Display = (props: Props) => {
  const [key, setKey] = useState("Press keys...");
  // const [captureKeys, setCaptureKeys] = useState<string[]>([]);
  const [captureKeys, setCaptureKeys] = useState<string>("");
  const [started, setStarted] = useState(false);

  const text: String =
    "A simple typing test is an effective tool for improving typing speed and accuracy. It typically presents users with a passage of text and prompts them to type it as quickly and accurately as possible within a specified time limit. As users type, the test tracks their speed, accuracy, and any errors made. At the end of the test, users receive feedback on their performance, including words per minute (WPM), accuracy percentage, and a breakdown of any mistakes made. Typing tests are commonly used for training purposes, skill assessment, and even as a fun way to challenge oneself or compete with others. With regular practice, users can gradually improve their typing skills and become more proficient typists.";
  var counter: number = 0;

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
    console.log("captureKeys:", captureKeys);
  }, [text]);

  useEffect(() => {
    function captureKeydown(event: KeyboardEvent) {
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);
      if (isAlphabetic){
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counter < spanElements.length) {
          const span = spanElements[counter] as HTMLElement;
          const nextSpan = spanElements[counter + 1] as HTMLElement;
          nextSpan.style.textDecoration = "underline";
          if (keyPressed === span.innerHTML) {
            span.style.color = "#444";
            span.style.textDecoration = "none";
            // span.style.textDecoration = "none";
          } else {
            span.style.color = "#444";
            span.style.borderRadius = "4px";
            span.style.textDecoration = "none";
            span.style.background = "rgb(252, 165, 165)";
            // console.log((captureKeys ?? "")[counter]);
          }
          if (counter === 0) setStarted(true);
          counter++;
        }
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
      <Timer started={started} />
      <div
        className="p-5 border-2 w-4/5 overflow-hidden font-semibold rounded-lg shadow-lg bg-sky-100 text-slate-500 text-4xl textBox bgred"
        dangerouslySetInnerHTML={{ __html: captureKeys as string }}
      ></div>
    </>
  );
};

export default Display;
