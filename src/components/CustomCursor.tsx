import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let glowX = 0;
    let glowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if mouse is over an interactive element (buttons, anchors, cards)
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".glass-panel-hover") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const updatePosition = () => {
      // Dynamic easing for a organic lag-behind effect (liquid style)
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (cursor) {
        cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }
      if (glow) {
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(updatePosition);
    };

    const animId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Large Ambient Purple Trail Glow - Now hardware-accelerated, scaling up to 160% on hover */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-40 blur-[45px] transition-all duration-500 ease-out bg-[radial-gradient(circle_at_center,rgba(138,63,252,0.25)_0%,rgba(224,75,255,0.15)_35%,rgba(0,242,254,0.06)_65%,transparent_80%)] ${
          isHovering ? "scale-160 opacity-100" : "scale-100 opacity-65"
        }`}
      />
      {/* Precision cursor container holding our high-end dual ring & core */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center transition-all duration-300"
        style={{ width: "1px", height: "1px" }}
      >
        {/* Holographic outer laser ring - Scales and glows beautifully when hovering over buttons */}
        <div
          className={`rounded-full absolute transition-all duration-300 ease-out ${
            isHovering
              ? "w-11 h-11 border border-cyber-neon/80 bg-cyber-neon/12 shadow-[0_0_20px_rgba(0,242,254,0.85),inset_0_0_8px_rgba(0,242,254,0.45)] scale-100"
              : "w-6 h-6 border border-white/20 scale-50 opacity-0"
          }`}
        />
        {/* Glowing inner core dot - transitions color and glows pink on hover */}
        <div
          className={`rounded-full absolute transition-all duration-200 ease-out ${
            isHovering
              ? "w-1.5 h-1.5 bg-cyber-magenta shadow-[0_0_12px_rgba(224,75,255,1)]"
              : "w-2 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          }`}
        />
      </div>
    </>
  );
}
