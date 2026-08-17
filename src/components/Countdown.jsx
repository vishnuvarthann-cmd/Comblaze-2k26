import React, { useState, useEffect } from 'react';
import { SYMPOSIUM_CONFIG } from '../data/config';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const target = new Date(SYMPOSIUM_CONFIG.targetCountDownDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      <div className="text-center mb-3">
        <span className="text-xs uppercase font-orbitron tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          Live Event Countdown
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINUTES', value: timeLeft.minutes },
          { label: 'SECONDS', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 md:p-6 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.1)]"
          >
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
            
            <span className="font-orbitron font-extrabold text-3xl md:text-5xl lg:text-6xl text-cyan-300 neon-text-cyan tracking-wider">
              {item.value}
            </span>
            <span className="font-rajdhani text-xs md:text-sm font-semibold tracking-widest text-slate-400 mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
