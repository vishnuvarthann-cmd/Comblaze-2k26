import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { scrambleText } from 'animejs/text';

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({
  text = '',
  className = '',
  scrambleChars = DEFAULT_CHARS,
  speed = 35,
}) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    const targetText = text;
    const length = targetText.length;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return targetText[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      if (iteration >= length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, speed);

    if (elementRef.current) {
      animate(elementRef.current, {
        opacity: [0.4, 1],
        scale: [0.97, 1],
        duration: 900,
        ease: 'outExpo'
      });
    }

    return () => clearInterval(interval);
  }, [text, scrambleChars, speed]);

  return (
    <span ref={elementRef} className={`inline-block font-mono tracking-wider ${className}`}>
      {displayText}
    </span>
  );
}
