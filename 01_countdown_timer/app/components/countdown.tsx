"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            alert("The timer you set has completed!");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 w-full max-w-md lg:max-w-lg xl:max-w-xl transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <Input
            type="number"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="w-full sm:flex-1 mb-4 sm:mb-0 sm:mr-4 rounded-xl hover:border-gray-700 border-2 border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Set
          </Button>
        </div>
        <div
          className={`text-5xl md:text-6xl font-extrabold mb-8 text-center ${
            isActive ? "animate-pulse" : ""
          } text-gray-800 dark:text-gray-200`}
        >
          {formatTime(timeLeft)}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="w-full sm:w-auto rounded-xl bg-green-500 hover:bg-green-600 hover:text-white transition duration-300"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="w-full sm:w-auto rounded-xl bg-yellow-500 hover:bg-yellow-600 hover:text-white transition duration-300"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:text-white transition duration-300 rounded-xl"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
