import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Cpu, HelpCircle, Shield, Rocket, Sparkles, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentLog, setCurrentLog] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const spaceLogs = [
    { text: "ESTABLISHING QUANTUM LINK TO VECTOR_GRID_ALPHA...", status: "OK", color: "text-cyber-neon" },
    { text: "INITIALIZING THERMONUCLEAR WARP CORE DIAGNOSTICS...", status: "OK", color: "text-cyber-magenta" },
    { text: "CALIBRATING ORBITAL TIME-DRIFT CORRECTION...", status: "OK", color: "text-blue-400" },
    { text: "STABILIZING ARTIFICIAL ANTIGRAVITY EMITTERS... (1.002 G)", status: "OK", color: "text-emerald-400" },
    { text: "GRID DEFLECTOR SHIELDS CAPACITORS AT 100%...", status: "OK", color: "text-cyber-neon" },
    { text: "SOLAR EMISSION DETECTED - CORES STABLE AND SHIELDED...", status: "OK", color: "text-amber-400" },
    { text: "PRE-COMPILING GAME PHYSICS ENGINES & PORTFOLIO LAYOUTS...", status: "OK", color: "text-cyber-magenta" },
    { text: "TWASY ENGINE V4.8 SECURE ORCHESTRATION ONLINE...", status: "READY", color: "text-cyber-neon" },
    { text: "WARPING INTO PORTFOLIO SECTOR...", status: "LAUNCH", color: "text-white font-bold" },
  ];

  // Particle interface for Starfield
  interface Star {
    x: number;
    y: number;
    z: number;
    color: string;
  }

  // Handle key listeners for "Space" key to speed up warp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsWarping(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsWarping(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Mouse move effect to tilt ship/influence particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulated progress logic - accelerated during warping
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    const updateProgress = () => {
      setProgress((prev) => {
        const increment = isWarping ? Math.random() * 5 + 4 : Math.random() * 1.5 + 0.4;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return next;
      });
    };

    intervalId = setInterval(updateProgress, isWarping ? 30 : 100);
    return () => clearInterval(intervalId);
  }, [isWarping, onComplete]);

  // Handle telemetry log scrolling
  useEffect(() => {
    const logIndex = Math.min(
      Math.floor((progress / 100) * spaceLogs.length),
      spaceLogs.length - 1
    );
    setCurrentLog(logIndex);
  }, [progress]);

  // Starfield canvas rendering engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize stars
    const starCount = 180;
    const stars: Star[] = [];
    const colors = ["#8a3ffc", "#e04bff", "#ffffff", "#00f2fe", "#2563eb"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const speedMultiplier = isWarping ? 25 : 2;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Semi-transparent background during warping creates motion blur streaks
      ctx.fillStyle = isWarping ? "rgba(8, 6, 13, 0.18)" : "rgba(8, 6, 13, 0.45)";
      ctx.fillRect(0, 0, width, height);

      // Draw cyber Grid base in background
      ctx.strokeStyle = isWarping ? "rgba(138, 63, 252, 0.05)" : "rgba(138, 63, 252, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render star warping space lines
      stars.forEach((star) => {
        star.z -= speedMultiplier;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1.5 - star.z / width) * 4.5;
          
          // Star trails
          if (isWarping) {
            const warpK = 128.0 / (star.z + speedMultiplier * 1.5);
            const prevPx = star.x * warpK + width / 2;
            const prevPy = star.y * warpK + height / 2;

            ctx.strokeStyle = star.color;
            ctx.lineWidth = size * 0.75;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.stroke();
          } else {
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isWarping]);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-cyber-black flex flex-col items-center justify-between py-12 px-6 select-none select-none">
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Futuristic cyber HUD rings on background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-25">
        <div className={`border border-cyber-neon/20 rounded-full w-[400px] h-[400px] flex items-center justify-center transition-transform duration-500 ${isWarping ? "scale-150 rotate-45" : ""}`}>
          <div className="border border-dashed border-cyber-magenta/20 rounded-full w-[340px] h-[340px] flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
            <div className="border border-double border-cyber-neon/15 rounded-full w-[260px] h-[260px]" />
          </div>
        </div>
      </div>

      {/* TOP HEADER: Title of game/system */}
      <div className="w-full max-w-5xl flex justify-between items-start z-10 font-mono text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-magenta animate-pulse" />
          <span>SYS_BOOT_SEQUENCER_v4.8</span>
        </div>
        <div className="text-right">
          <span>PORT_LOAD_GRID: SECURE_CORE</span>
        </div>
      </div>

      {/* CENTER INTERACTIVE HUD */}
      <div 
        className="relative flex flex-col items-center justify-center my-auto z-10 w-full"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Animated Cybernetic Spaceship / HUD Target System */}
        <div className="relative mb-6 flex items-center justify-center">
          <motion.div
            animate={{
              y: isWarping ? [-2, 2, -2] : [-6, 6, -6],
              scale: isWarping ? 1.05 : 1,
            }}
            transition={{
              repeat: Infinity,
              duration: isWarping ? 0.3 : 3,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Holographic Glowing Spaceship Wireframe */}
            <svg
              viewBox="0 0 100 100"
              className={`w-32 h-32 md:w-36 md:h-36 drop-shadow-[0_0_15px_rgba(224,75,255,0.4)] transition-all duration-300 ${isWarping ? "scale-110 drop-shadow-[0_0_25px_rgba(224,75,255,0.85)] text-white" : "text-cyber-magenta"}`}
              fill="none"
            >
              {/* Ship Geometry Chassis */}
              <path
                d="M 50,15 L 68,55 L 50,47 L 32,55 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Outer Thrusters wings */}
              <path d="M 32,55 L 24,68 L 32,65 M 68,55 L 76,68 L 68,65" stroke="currentColor" strokeWidth="1" />
              {/* Center cockpit line */}
              <line x1="50" y1="15" x2="50" y2="47" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              
              {/* Warping Speed Effect Ring */}
              <circle cx="50" cy="50" r="18" stroke="url(#loading-hud-glow)" strokeWidth="0.75" strokeDasharray="4 6" className="animate-spin" style={{ animationDuration: "12s" }} />
              
              {/* Back Burner Flame Emitter */}
              <path
                d={isWarping ? "M 46,65 L 50,92 L 54,65 Z" : "M 48,65 L 50,75 L 52,65 Z"}
                fill={isWarping ? "url(#fire-warp-grad)" : "url(#fire-grad)"}
                className="opacity-95"
              />

              <defs>
                <radialGradient id="loading-hud-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8A3FFC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E04BFF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="fire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e04bff" />
                  <stop offset="100%" stopColor="#8a3ffc" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="fire-warp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e04bff" />
                  <stop offset="100%" stopColor="#8a3ffc" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Radar / Scanner Lines */}
            <div className="absolute top-0 inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-36 h-36 border border-cyber-neon/15 rounded-full absolute transition-all duration-300 ${isWarping ? "scale-125 border-cyber-neon/30 animate-ping" : "animate-pulse"}`} />
            </div>
          </motion.div>
        </div>

        {/* Loading progress Percentage Text */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="heading-cyber text-2xl md:text-3xl text-white tracking-widest font-black drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
            {Math.min(Math.floor(progress), 100)}<span className="text-cyber-neon">%</span>
          </h2>
          <p className="font-mono text-[9px] uppercase tracking-widest text-cyber-magenta/85 animate-pulse">
            {isWarping ? "Warp factor // hyperdrive activated" : "Calibrating systems // standard entry"}
          </p>
        </div>

        {/* LOADING PROGRESS GLASS PANEL TRACKER */}
        <div className="w-full max-w-sm px-6 mt-6">
          <div className="relative h-2 w-full bg-cyber-purple/40 rounded-full border border-white/5 overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            {/* Glowing progress filling gradient bar */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyber-neon via-cyber-magenta to-white rounded-full shadow-[0_0_15px_rgba(224,75,255,0.8)]"
              style={{ width: `${progress}%` }}
              layoutId="progressBarFill"
            />
            {/* Dynamic star shimmer sweeping sheen */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-sweep" />
          </div>
        </div>

        {/* HOLD CLICK TO BOOST INTERACTIVE TOOLTIP */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onMouseDown={() => setIsWarping(true)}
            onMouseUp={() => setIsWarping(false)}
            onMouseLeave={() => setIsWarping(false)}
            onTouchStart={(e) => { e.preventDefault(); setIsWarping(true); }}
            onTouchEnd={() => setIsWarping(false)}
            className={`group select-none relative flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 backdrop-blur-sm cursor-pointer z-20 ${
              isWarping
                ? "bg-gradient-to-r from-cyber-magenta via-cyber-neon to-cyber-magenta border-white text-white scale-95 shadow-[0_0_25px_rgba(224,75,255,0.6)]"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-cyber-magenta hover:bg-cyber-magenta/10 hover:text-white hover:scale-105"
            }`}
          >
            <Rocket className={`w-4 h-4 transition-transform duration-300 ${isWarping ? "translate-y-[-4px] rotate-45 text-white" : "group-hover:rotate-12 text-cyber-magenta"}`} />
            <span>{isWarping ? "HOLDING ENGAGED!" : "HOLD TO ENGAGE HYPERDRIVE"}</span>
            <span className="text-[9px] text-gray-500 lowercase opacity-75 hidden md:inline-block font-normal">
              (or hold Spacebar)
            </span>
          </button>
        </div>
      </div>

      {/* BOTTOM AREA: Cyber diagnostics telemetry terminal */}
      <div className="w-full max-w-2xl z-10 font-mono text-[10px] mt-6 bg-cyber-dark/80 border border-white/5 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-cyber-neon border-b border-white/5 pb-2 mb-2 font-bold">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>DEBIAN_SYSTEM_LOGS // METRIC_BUFFER: OK</span>
        </div>
        
        {/* Dynamic Telemetry Scrolling Log Lines */}
        <div className="space-y-1 max-h-[85px] overflow-hidden text-left">
          <AnimatePresence mode="popLayout">
            {spaceLogs.slice(Math.max(0, currentLog - 3), currentLog + 1).map((log, index) => (
              <motion.div
                key={log.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between text-[10px] leading-relaxed"
              >
                <div className="flex items-center gap-1.5 text-gray-400 truncate max-w-[85%]">
                  <span className="text-cyber-neon/45">&gt;&gt;</span>
                  <span className="truncate">{log.text}</span>
                </div>
                <span className={`font-semibold uppercase ${log.color} bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-[9px]`}>
                  {log.status}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
