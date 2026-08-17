import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  return (
    <StyledWrapper>
      <p className="loader"><span>COMBLAZE 2K26</span></p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    max-width: fit-content;
    color: #00f3ff;
    font-size: 42px;
    font-family: 'Orbitron', sans-serif;
    position: relative;
    font-style: italic;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 243, 255, 0.6);
  }

  @media (min-width: 640px) {
    .loader {
      font-size: 60px;
    }
  }

  .loader span {
    display: inline-block;
    animation: cut 2s infinite;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .loader:hover {
    color: #f59e0b;
  }

  .loader::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 6px;
    border-radius: 4px;
    background-color: rgba(0, 243, 255, 0.6);
    top: 0px;
    filter: blur(10px);
    animation: scan 2s infinite;
    left: 0;
    z-index: 0;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .loader::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 5px;
    border-radius: 4px;
    background-color: #00f3ff;
    top: 0px;
    animation: scan 2s infinite;
    left: 0;
    z-index: 1;
    filter: opacity(0.9);
    box-shadow: 0 0 15px #00f3ff;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes scan {
    0% {
      top: 0px;
    }
    25% {
      top: 65px;
    }
    50% {
      top: 0px;
    }
    75% {
      top: 65px;
    }
  }

  @keyframes cut {
    0% {
      clip-path: inset(0 0 0 0);
    }
    25% {
      clip-path: inset(100% 0 0 0);
    }
    50% {
      clip-path: inset(0 0 100% 0);
    }
    75% {
      clip-path: inset(0 0 0 0);
    }
  }
`;

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 bg-[#02040a] flex flex-col items-center justify-center select-none"
        >
          <Loader />
          <p className="mt-6 text-xs font-mono font-bold text-cyan-400/80 tracking-widest uppercase animate-pulse">
            INITIALIZING SYSTEM CORE...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
