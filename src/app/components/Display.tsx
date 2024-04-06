"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import texts from "@/SampleTexts/easyTexts";
import { renderTexts } from "../hooks/renderTexts";

type Props = {
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
  counter: number;
  statsRedirect: (newValue: number) => void;
};

const Display = (props: Props) => {
  const [captureKeys, setCaptureKeys] = useState<string>("");

  var correctWords = 0;
  var wrongWords = 0;
  var wordLenght = 0;

  var counterRef = useRef(props.counter);
  useEffect(() => {
    const data = renderTexts();
    wordLenght = data.length;
    setCaptureKeys(data.text);
  }, [texts]);

  // Check correct and wrongs keys on keyboard events
  useEffect(() => {
    const captureKeydown = async (event: KeyboardEvent) => {
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);

      if (!props.started) {
        props.setStarted(true);
      }
      if (isAlphabetic) {
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counterRef.current < spanElements.length - 1) {
          const span = spanElements[counterRef.current] as HTMLElement;
          const nextSpan = spanElements[counterRef.current + 1] as HTMLElement;
          nextSpan.style.textDecoration = "underline";
          if (keyPressed === span.innerHTML) {
            span.style.color = "yellow";
            span.style.textDecoration = "none";
            correctWords++;
          } else {
            span.style.color = "red";
            span.style.textDecoration = "none";
            wrongWords++;
          }
          counterRef.current++;
        } else {
          try {
            const response = await fetch("http://localhost:3000/api/wpm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                correct: correctWords,
                wrong: wrongWords,
                // words: wordLenght,
              }),
            });

            if (!response.ok) {
              throw new Error(
                `API request failed with status ${response.status}`
              );
            }
            props.statsRedirect(0);
          } catch (error) {
            console.error("Error:", error);
          }
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

  return (
    <>
      <div
        className="p-5 border-2 w-4/5 overflow-hidden font-semibold rounded-lg shadow-lg bg-gray-800 text-slate-500 text-4xl textBox bgred font-mono"
        dangerouslySetInnerHTML={{ __html: captureKeys as string }}
      ></div>
    </>
  );
};

export default Display;
