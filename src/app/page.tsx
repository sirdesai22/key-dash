"use client";
// import Display from "./components/Display";
import { useEffect, useRef, useState } from "react";
// import Timer from "./components/Timer";
import { formatTime } from "../hooks/formatTime";
import { renderTexts } from "../hooks/renderTexts";
import texts from "@/SampleTexts/easyTexts";
import Timer from "../components/Timer";
import Navbar from "@/components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export default function Home() {
  const [started, setStarted] = useState(false);
  // const [time, setTime] = useState(15);
  const time = useRef(15);

  const handleReset = () => {
    counter.current = 0;
    setStarted(false); // Reset started state
    time.current = 15; // Reset typing test counter
  };

  const [captureKeys, setCaptureKeys] = useState<string>("");

  useEffect(() => {
    const data = renderTexts();
    totalWords.current = data.length;
    // console.log(totalWords);
    setCaptureKeys(data.text);
  }, [started]);

  // Check correct and wrongs keys on keyboard events
  var totalWords = useRef(0);
  var counter = useRef(0);
  var correctWords = useRef(0);
  var wrongWords = useRef(0);

  const setWords = () => {
    redirectStats(time.current);
  };

  const redirectStats = async (time: number) => {
    // const correct = correctWords
    // const wrong = wrongWords
    try {
      const response = await fetch("/api/wpm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correct: correctWords.current,
          wrong: wrongWords.current,
          time: 15,
          totalWords: totalWords.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      // statsRedirect(0);
      window.location.href = "/stats";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const captureKeydown = async (event: KeyboardEvent) => {
      const keyPressed = event.key;
      const isAlphabetic = /^[A-Za-z,.\s]$/.test(keyPressed);

      if (!started) {
        setStarted(true);
      }
      if (isAlphabetic) {
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counter.current < spanElements.length - 1) {
          const span = spanElements[counter.current] as HTMLElement;
          const nextSpan = spanElements[counter.current + 1] as HTMLElement;
          nextSpan.style.textDecoration = "underline";
          if (keyPressed === span.innerHTML) {
            span.style.color = "yellow";
            span.style.textDecoration = "none";
            correctWords.current++;
          } else {
            span.style.color = "red";
            span.style.textDecoration = "none";
            wrongWords.current++;
          }
          counter.current++;
        } else {
          redirectStats(time.current);
        }
      }

      if (keyPressed === "Backspace" && counter.current > 0) {
        counter.current--;
        const spanElements = document.querySelectorAll(".textBox > span");
        if (counter.current < spanElements.length) {
          const span = spanElements[counter.current] as HTMLElement;
          const nextSpan = spanElements[counter.current + 1] as HTMLElement;
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

  const [user, setUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });

  return (
    <>
      <div className=" w-full min-h-screen bg-[#252525] bg-dot-white/[0.6] relative flex flex-col justify-center items-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {
          user
          ?<Navbar />
          :<></>
        }
        <div className="flex flex-col justify-center items-center w-full z-10 mt-10">
          <Timer
            started={started}
            time={time}
            redirectStats={setWords}
            handleReset={handleReset}
          />

          {/* Display  */}
          <div
            className="p-5 border-2 w-4/5 overflow-hidden font-semibold  rounded-lg shadow-lg bg-gray-800 text-slate-500 text-4xl textBox bgred font-mono"
            dangerouslySetInnerHTML={{ __html: captureKeys as string }}
          ></div>
        </div>
      </div>
    </>
  );
}
