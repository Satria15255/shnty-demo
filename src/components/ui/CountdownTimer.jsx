import { useEffect, useState } from "react";

const getTimeLeft = (expiresAt) => {
  const difference = new Date(expiresAt).getTime() - Date.now();

  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatTime = (value) => {
  return String(value).padStart(2, "0");
};

function CountdownTimer({ expiresAt, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft(expiresAt);

      setTimeLeft(newTimeLeft);

      const isExpired =
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0;

      if (isExpired) {
        clearInterval(interval);

        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 w-full md:px-6 py-4">
      <div className="flex items-start justify-center gap-4 tabular-nums">
        <TimeBox value={formatTime(timeLeft.hours)} label="HH" />

        <span className="mt-1 text-xl text-neutral-500 tabular-nums">:</span>

        <TimeBox value={formatTime(timeLeft.minutes)} label="MM" />

        <span className="mt-1 text-xl text-neutral-500 tabular-nums">:</span>

        <TimeBox value={formatTime(timeLeft.seconds)} label="SS" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="w-[20px] md:w-[40px] text-center">
      <p className="text-lg lg:text-3xl font-semibold tabular-nums text-white">
        {value}
      </p>

      <span className="mt-1 block text-xs tracking-[0.25em] text-neutral-500">
        {label}
      </span>
    </div>
  );
}

export default CountdownTimer;
