import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface PrismShardProps {
  size?: number;
  className?: string;
  parallaxFactor?: number;
  delay?: number;
}

export default function PrismShard({
  size = 320,
  className = "",
  parallaxFactor = 0.2,
  delay = 0,
}: PrismShardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling
  const [scrollY, setScrollY] = useState(0);

  // Motion values for smooth 3D tilting
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transX = useMotionValue(0);
  const transY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 65, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 65, damping: 16 });
  const springTransX = useSpring(transX, { stiffness: 60, damping: 18 });
  const springTransY = useSpring(transY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const activeRadius = size * 1.5;

      if (distance < activeRadius) {
        const strength = 1 - distance / activeRadius;
        const maxTilt = 28; // Beautiful dynamic tilt angles
        const maxShift = 24;

        rotateX.set((dy / activeRadius) * -maxTilt * strength);
        rotateY.set((dx / activeRadius) * maxTilt * strength);
        transX.set((dx / activeRadius) * maxShift * strength);
        transY.set((dy / activeRadius) * maxShift * strength);
      } else {
        rotateX.set(0);
        rotateY.set(0);
        transX.set(0);
        transY.set(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size, rotateX, rotateY, transX, transY]);

  const yScrollOffset = scrollY * parallaxFactor;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
      animate={{ opacity: 1, scale: isHovered ? 1.12 : 1.0, rotate: isHovered ? 5 : -15 }}
      transition={{
        opacity: { duration: 1.5, delay },
        scale: { type: "spring", stiffness: 80, damping: 14 },
        rotate: { type: "spring", stiffness: 40, damping: 15 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        transX.set(0);
        transY.set(0);
      }}
      style={{
        width: size,
        height: size,
        rotateX: springX,
        rotateY: springY,
        x: springTransX,
        y: springTransY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        translateY: -yScrollOffset,
      }}
      className={`absolute select-none pointer-events-auto filter hover:brightness-110 transition-all duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Prismatic glow gradients matching the neon, magenta, and green hints of Image 2 */}
          <linearGradient id={`pink-neon-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ea" />
            <stop offset="50%" stopColor="#c200ff" />
            <stop offset="100%" stopColor="#12003c" />
          </linearGradient>

          <linearGradient id={`blue-glass-${size}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="40%" stopColor="#0051ff" />
            <stop offset="100%" stopColor="#03001e" />
          </linearGradient>

          <linearGradient id={`iridescent-yellow-${size}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fffb00" />
            <stop offset="30%" stopColor="#00ff66" />
            <stop offset="70%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          <linearGradient id={`prism-center-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ff52b1" />
            <stop offset="60%" stopColor="#871bff" />
            <stop offset="90%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#050114" />
          </linearGradient>

          <radialGradient id={`shard-halo-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(224, 75, 255, 0.25)" />
            <stop offset="40%" stopColor="rgba(0, 242, 254, 0.12)" />
            <stop offset="80%" stopColor="rgba(138, 63, 252, 0.04)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          {/* Film Grain matrix for premium physical render feel */}
          <filter id={`shard-grain-${size}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* 1. Behind Shard Neon Back Glow */}
        <circle cx="250" cy="250" r="210" fill={`url(#shard-halo-${size})`} filter="blur(22px)" />

        {/* 2. Group of Sharp Geometric Interlocking Prismatic Shards */}
        <g style={{ transformStyle: "preserve-3d" }}>
          
          {/* Main central elongated crystal pillar */}
          {/* Face 1: Left facet */}
          <polygon
            points="140,320 250,70 250,380"
            fill={`url(#blue-glass-${size})`}
            stroke="rgba(0, 242, 254, 0.4)"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Face 2: Right facet (Super bright highlight specular) */}
          <polygon
            points="250,70 380,240 250,380"
            fill={`url(#prism-center-${size})`}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
            opacity="0.98"
          />

          {/* Accent Shard 3: Upper floating sharp needle projecting outward */}
          <motion.polygon
            points="240,60 310,20 260,110"
            fill={`url(#pink-neon-${size})`}
            stroke="rgba(224, 75, 255, 0.3)"
            strokeWidth="1.5"
            opacity="0.9"
            animate={{
              transform: isHovered ? "translate(8px, -12px) translateZ(20px)" : "translate(0px, 0px) translateZ(0px)",
            }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
          />

          {/* Accent Shard 4: Bottom sharp shard breaking out */}
          <motion.polygon
            points="180,390 250,380 200,460"
            fill={`url(#pink-neon-${size})`}
            stroke="rgba(224, 75, 255, 0.4)"
            strokeWidth="1"
            opacity="0.85"
            animate={{
              transform: isHovered ? "translate(-12px, 14px) translateZ(15px)" : "translate(0px, 0px) translateZ(0px)",
            }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
          />

          {/* Accent Shard 5: Top-right side shattered wing */}
          <motion.polygon
            points="380,240 460,190 350,310"
            fill={`url(#iridescent-yellow-${size})`}
            stroke="rgba(0, 255, 102, 0.3)"
            strokeWidth="1"
            opacity="0.9"
            animate={{
              transform: isHovered ? "translate(16px, 10px) translateZ(25px)" : "translate(0px, 0px) translateZ(0px)",
            }}
            transition={{ type: "spring", stiffness: 70, damping: 10 }}
          />

          {/* Accent Shard 6: Left wing splinter */}
          <motion.polygon
            points="60,250 140,320 170,220"
            fill={`url(#blue-glass-${size})`}
            stroke="rgba(0, 242, 254, 0.5)"
            strokeWidth="1"
            opacity="0.85"
            animate={{
              transform: isHovered ? "translate(-15px, -5px) translateZ(10px)" : "translate(0px, 0px) translateZ(0px)",
            }}
            transition={{ type: "spring", stiffness: 75, damping: 13 }}
          />

          {/* Central spine neon hot core lines (Iridescence effect) */}
          <line x1="250" y1="70" x2="250" y2="380" stroke="#ffffff" strokeWidth="4" filter="blur(1.5px)" opacity="0.9" />
          <line x1="250" y1="90" x2="250" y2="360" stroke="#00f0ff" strokeWidth="1.5" />

          {/* Outer edge refractive specular dots (Star glares) */}
          <circle cx="250" cy="70" r="4.5" fill="#ffffff" filter="blur(0.5px)" />
          <circle cx="380" cy="240" r="3.5" fill="#ffffff" />
          <circle cx="140" cy="320" r="3" fill="#ffffff" />

          {/* Soft secondary glass refraction sheet */}
          <polygon
            points="210,130 250,70 290,130"
            fill="rgba(255, 255, 255, 0.12)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.8"
            filter="blur(1px)"
          />
        </g>

        {/* Physical grain layer */}
        <rect cx="0" cy="0" width="500" height="500" filter={`url(#shard-grain-${size})`} className="opacity-60 pointer-events-none mix-blend-overlay" />
      </svg>
    </motion.div>
  );
}
