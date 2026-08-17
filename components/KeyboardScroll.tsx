'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { switchAudio } from '../lib/audio';

const TOTAL_FRAMES = 906; // 0 to 905 frames
const FOG_BG_COLOR = '#ECECEC';

// Story overlay chapters timed by scroll progress (0.0 to 1.0)
const CHAPTERS = [
  {
    id: 1,
    start: 0.00,
    end: 0.16,
    subtitle: "SERIES ONE",
    title: "WpDev One",
    description: "Architected from solid aerospace-grade 6063 aluminum. A masterclass in tactile luxury.",
    position: "top-24 left-8 md:left-16"
  },
  {
    id: 2,
    start: 0.20,
    end: 0.38,
    subtitle: "ACOUSTIC ENGINEERING",
    title: "12-Layer Dampening Architecture",
    description: "Precision-cut PORON gaskets, IXPE switch pads, and PET acoustic film eliminate resonant reverberation.",
    position: "top-32 right-8 md:right-16 text-right"
  },
  {
    id: 3,
    start: 0.42,
    end: 0.62,
    subtitle: "MAGNETIC HALL-EFFECT",
    title: "Rapid-Trigger Actuation",
    description: "0.1mm adjustable sensitivity per key. Dynamic actuation points powered by ultra-low latency sensor matrices.",
    position: "bottom-32 left-8 md:left-16"
  },
  {
    id: 4,
    start: 0.66,
    end: 0.84,
    subtitle: "ELECTRONIC CIRCUITRY",
    title: "Gold-Plated Hot-Swap PCB",
    description: "South-facing RGB LEDs, ARM Cortex-M4 microcontroller, and dual-mode 8000Hz polling rate engine.",
    position: "bottom-32 right-8 md:right-16 text-right"
  },
  {
    id: 5,
    start: 0.88,
    end: 1.00,
    subtitle: "PRECISION REASSEMBLY",
    title: "Purist Perfection",
    description: "Seamless magnetic latching reassembles the chassis into a monolithic workstation sculpture.",
    position: "top-28 left-1/2 -translate-x-1/2 text-center"
  }
];

export interface KeyboardScrollProps {
  onOpenSpecs?: () => void;
}

export const KeyboardScroll: React.FC<KeyboardScrollProps> = ({ onOpenSpecs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Frame cache storage
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [useProceduralFallback, setUseProceduralFallback] = useState<boolean>(false);

  // Framer Motion scroll hook bound to containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lastDrawnFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Helper to generate file paths for frames
  const getFramePath = (index: number): string => {
    // Primary path matching ezgif-split output: frame_[i]_delay-0.04s.webp
    return `/frames/frame_${index}_delay-0.04s.webp`;
  };

  // Preload images sequence
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    loadedCountRef.current = 0;

    let failedCount = 0;
    const sampleBatchSize = Math.min(30, TOTAL_FRAMES);

    // Test first few images to determine if real frame files exist in /frames/
    const checkSampleFrames = async () => {
      let sampleFailures = 0;
      for (let i = 0; i < sampleBatchSize; i += 5) {
        const testImg = new Image();
        const loaded = await new Promise<boolean>((resolve) => {
          testImg.onload = () => resolve(true);
          testImg.onerror = () => resolve(false);
          testImg.src = getFramePath(i);
        });
        if (!loaded) sampleFailures++;
      }

      if (sampleFailures > 2) {
        // If external image files are not on disk, gracefully use the high-fidelity 3D procedural canvas generator!
        setUseProceduralFallback(true);
        setIsLoaded(true);
        setLoadingProgress(100);
        return;
      }

      // Load image sequence in priority batches
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          loadedCountRef.current += 1;
          const progress = Math.min(100, Math.floor((loadedCountRef.current / TOTAL_FRAMES) * 100));
          setLoadingProgress(progress);

          if (loadedCountRef.current >= Math.floor(TOTAL_FRAMES * 0.25) && !isLoaded) {
            setIsLoaded(true); // Allow interactive scroll early while remaining buffer loads
          }
        };
        img.onerror = () => {
          failedCount++;
          if (failedCount > TOTAL_FRAMES * 0.4 && !useProceduralFallback) {
            setUseProceduralFallback(true);
            setIsLoaded(true);
            setLoadingProgress(100);
          }
        };
      }
    };

    checkSampleFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame to canvas with contain-fit, HiDPI scaling, and fog background blending
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    // Fill exact fog background color across entire viewport canvas
    ctx.fillStyle = FOG_BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    const img = imagesRef.current[frameIndex];

    if (img && img.complete && img.naturalWidth > 0 && !useProceduralFallback) {
      // Draw image frame using contain fit
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const scale = Math.min((width * 0.85) / imgWidth, (height * 0.8) / imgHeight);
      
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    } else {
      // Ultra-High-Fidelity 3D Procedural Canvas Exploded Layer Generator Fallback
      // This draws an editorial keyboard expanding into layers matching exact frame (0 -> 905)
      drawProceduralExplodedKeyboard(ctx, width, height, frameIndex / (TOTAL_FRAMES - 1));
    }

    lastDrawnFrameRef.current = frameIndex;
  }, [useProceduralFallback]);

  // Procedural 3D Exploded Keyboard Renderer (Precision Hardware Aesthetic)
  const drawProceduralExplodedKeyboard = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number
  ) => {
    const cx = w / 2;
    const cy = h / 2;

    // Expansion curve: 0 -> 1 -> 0 (opens in middle, reassembles at end)
    const expansionRatio = Math.sin(progress * Math.PI);
    
    // Scale factor for responsive canvas
    const baseW = Math.min(w * 0.65, 750);
    const baseH = baseW * 0.38;

    // Perspective angle rotation
    const tilt = 0.45 + expansionRatio * 0.15;

    ctx.save();
    ctx.translate(cx, cy + expansionRatio * 20);

    // Exploded layers definition (from bottom to top)
    const layers = [
      { name: "Solid Aluminum Bottom Chassis", color: "#222224", shadowColor: "rgba(0,0,0,0.12)", height: 16, offset: 0 },
      { name: "4000mAh Battery & Wireless Module", color: "#3A3B3E", shadowColor: "rgba(0,0,0,0.08)", height: 6, offset: 50 },
      { name: "South-Facing RGB Hot-Swap PCB", color: "#1E2923", shadowColor: "rgba(0,0,0,0.09)", height: 8, offset: 110, traces: true },
      { name: "IXPE Switch Pad & PORON Foam", color: "#151516", shadowColor: "rgba(0,0,0,0.06)", height: 7, offset: 160 },
      { name: "Anodized Brass Positioning Plate", color: "#C5A059", shadowColor: "rgba(0,0,0,0.1)", height: 10, offset: 210 },
      { name: "WpDev Magnetic Hall Switches", color: "#E0E0E0", accent: "#E53E3E", height: 28, offset: 270, isSwitches: true },
      { name: "Double-Shot PBT Keycaps", color: "#FAF9F6", topColor: "#EAEAEA", height: 32, offset: 350, isKeycaps: true },
      { name: "CNC Aluminum Top Frame", color: "#D1D5DB", shadowColor: "rgba(0,0,0,0.15)", height: 14, offset: 420 }
    ];

    // Render layers from back (bottom) to front (top)
    layers.forEach((layer) => {
      const layerOffsetY = -layer.offset * expansionRatio * 0.85;

      ctx.save();
      ctx.translate(0, layerOffsetY);

      // Layer shadow on fog
      if (expansionRatio > 0.05) {
        ctx.fillStyle = layer.shadowColor || 'rgba(0,0,0,0.04)';
        ctx.beginPath();
        ctx.ellipse(0, layer.height + 30 * expansionRatio, baseW * 0.52, baseH * 0.55 * tilt, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw isometric rounded layer slab
      const lw = baseW;
      const lh = baseH * tilt;
      const lDepth = layer.height;

      // Base slab body
      ctx.fillStyle = layer.color;
      ctx.beginPath();
      ctx.roundRect(-lw / 2, -lh / 2, lw, lh, 16);
      ctx.fill();

      // Top face gradient highlight
      const grad = ctx.createLinearGradient(-lw / 2, -lh / 2, lw / 2, lh / 2);
      grad.addColorStop(0, layer.topColor || 'rgba(255,255,255,0.18)');
      grad.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // PCB Traces effect
      if (layer.traces) {
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let t = -lw * 0.4; t < lw * 0.4; t += 40) {
          ctx.moveTo(t, -lh * 0.3);
          ctx.lineTo(t + 15, 0);
          ctx.lineTo(t - 10, lh * 0.3);
        }
        ctx.stroke();
      }

      // Switch Stem Array
      if (layer.isSwitches) {
        const rows = 5;
        const cols = 14;
        const stepX = (lw * 0.88) / cols;
        const stepY = (lh * 0.82) / rows;
        const startX = -lw * 0.44 + stepX / 2;
        const startY = -lh * 0.41 + stepY / 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const sx = startX + c * stepX;
            const sy = startY + r * stepY;

            // Switch housing
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(sx - 6, sy - 5, 12, 10);
            
            // Switch red stem
            ctx.fillStyle = layer.accent || '#E53E3E';
            ctx.fillRect(sx - 3, sy - 2.5, 6, 5);
          }
        }
      }

      // Keycap matrix rendering
      if (layer.isKeycaps) {
        const rows = 5;
        const cols = 14;
        const stepX = (lw * 0.88) / cols;
        const stepY = (lh * 0.82) / rows;
        const startX = -lw * 0.44 + stepX / 2;
        const startY = -lh * 0.41 + stepY / 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const kx = startX + c * stepX;
            const ky = startY + r * stepY;

            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.roundRect(kx - stepX * 0.42, ky - stepY * 0.4, stepX * 0.84, stepY * 0.8, 4);
            ctx.fill();

            // Keycap legend dot/line
            ctx.fillStyle = 'rgba(0,0,0,0.45)';
            ctx.fillRect(kx - 2, ky - 2, 4, 4);
          }
        }
      }

      // Layer annotation label tag
      if (expansionRatio > 0.35) {
        ctx.save();
        const labelX = lw / 2 + 35;
        const labelY = 0;
        
        // Leader line
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(lw * 0.4, 0);
        ctx.lineTo(labelX - 10, labelY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillText(layer.name.toUpperCase(), labelX, labelY + 4);
        ctx.restore();
      }

      ctx.restore();
    });

    ctx.restore();
  };

  // Resize listener to adjust canvas dimensions dynamically
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Redraw current frame immediately
      renderFrameToCanvas(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrameToCanvas]);

  // Sync scrollYProgress to frame index
  useMotionValueEvent(scrollYProgress, "change", (latestScroll) => {
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latestScroll * (TOTAL_FRAMES - 1)))
    );

    if (frameIndex !== lastDrawnFrameRef.current) {
      setCurrentFrame(frameIndex);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        renderFrameToCanvas(frameIndex);
        
        // Haptic sound click on layer snaps
        if (frameIndex % 90 === 0 && frameIndex > 0) {
          switchAudio.playLayerSnap();
        }
      });
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#ECECEC]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block touch-none"
        />

        {/* Loading Spinner & Progress Overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-[#ECECEC] z-40 flex flex-col items-center justify-center p-6"
            >
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-2 border-black/10 rounded-full" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent border-t-black/80 rounded-full"
                />
              </div>

              <p className="text-sm font-medium tracking-wider text-black/80 uppercase mb-2">
                Loading WpDev Sequence...
              </p>

              <div className="w-48 h-1 bg-black/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-black/80 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <span className="text-xs text-black/50 font-mono">
                {loadingProgress}% ({loadedCountRef.current} / {TOTAL_FRAMES} frames)
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Text Overlays (Timed Fade In/Out) */}
        {CHAPTERS.map((chap) => {
          const progress = currentFrame / (TOTAL_FRAMES - 1);
          const isActive = progress >= chap.start && progress <= chap.end;

          return (
            <AnimatePresence key={chap.id}>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute ${chap.position} max-w-sm z-20 pointer-events-none p-4`}
                >
                  <div className="glass-pill p-6 rounded-2xl">
                    <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block mb-1.5">
                      {chap.subtitle}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-black/90 mb-2">
                      {chap.title}
                    </h2>
                    <p className="text-xs leading-relaxed text-black/60 font-normal">
                      {chap.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}

        {/* Floating Bottom HUD Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-5 py-2.5 glass-pill rounded-full text-xs font-mono text-black/70 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FRAME {String(currentFrame).padStart(3, '0')} / {TOTAL_FRAMES - 1}</span>
          </div>

          <div className="w-px h-3 bg-black/15" />

          <button
            onClick={onOpenSpecs}
            className="hover:text-black transition-colors font-medium cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            EXPLODE SPECS
          </button>
        </div>
      </div>
    </div>
  );
};
