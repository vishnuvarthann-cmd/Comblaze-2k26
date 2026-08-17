import React, { useState, useEffect } from 'react';
import { SYMPOSIUM_INFO } from '../data/eventsData';

export default function CountdownTimer({ targetDate = SYMPOSIUM_INFO.eventIsoDate || '2026-03-25T08:30:00+05:30' }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto my-6">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINUTES', value: timeLeft.minutes },
        { label: 'SECONDS', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md shadow-xl hover:border-cyan-500/40 transition-colors"
        >
          <span className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 font-mono">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wider mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
