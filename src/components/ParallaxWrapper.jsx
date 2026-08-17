import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxWrapper({ children, speed = 0.5, direction = 'up', className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Graceful degradation checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;

    // If reduced motion is requested or device is mobile, skip parallax calculation to preserve performance
    if (prefersReducedMotion || isMobileDevice || !elementRef.current) {
      return;
    }

    const yAmount = direction === 'up' ? -100 * speed : 100 * speed;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: yAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
