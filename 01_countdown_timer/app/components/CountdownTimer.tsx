"use client"
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Seconds
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg text-white">
      <h1 className="text-2xl mb-4 font-bold">Countdown Timer</h1>
      <div className="text-4xl mb-4">{`${Math.floor(time / 60)}:${("0" + (time % 60)).slice(-2)}`}</div>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          className="w-20 p-2 rounded-lg bg-gray-700"
          placeholder="Minutes"
          onChange={(e) => setTime(parseInt(e.target.value) * 60)}
        />
        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
