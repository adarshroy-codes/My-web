import { motion } from "motion/react";
import { Award, Layers, ShieldCheck, Flame } from "lucide-react";
import GlassOrb from "./GlassOrb";

export default function About() {
  const stats = [
    {
      id: "projects",
      title: "Projects",
      value: "24+",
      sub: "Worlds Created",
      color: "rgba(138, 63, 252, 0.4)",
      border: "border-cyber-neon/30",
      icon: <Layers className="w-5 h-5 text-cyber-neon" />,
    },
    {
      id: "experience",
      title: "Experience",
      value: "6+ Yrs",
      sub: "Gameplay Systems",
      color: "rgba(224, 75, 255, 0.4)",
      border: "border-cyber-magenta/30",
      icon: <Award className="w-5 h-5 text-cyber-magenta" />,
    },
    {
      id: "passion",
      title: "Passion",
      value: "100%",
      sub: "Engine Optimized",
      color: "rgba(255, 255, 255, 0.3)",
      border: "border-white/20",
      icon: <Flame className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section id="about" className="relative min-h-screen py-24 px-4 flex flex-col justify-center z-10 max-w-5xl mx-auto">
      {/* Immersive interactive Glass Orbs (satisfying to scroll!) */}
      <GlassOrb
        size={340}
        parallaxFactor={0.25}
        className="-left-24 sm:-left-56 top-16 pointer-events-none opacity-45 mix-blend-screen z-0"
        delay={0.2}
      />
      <GlassOrb
        size={240}
        parallaxFactor={0.12}
        className="-right-12 sm:-right-44 bottom-10 pointer-events-none opacity-50 mix-blend-screen z-0"
        delay={0.4}
      />

      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyber-neon" />
          <span className="font-mono text-xs text-cyber-neon uppercase tracking-widest">
            COGNITIVE_PROFILE_01
          </span>
        </div>
        <h2 className="heading-cyber text-3xl sm:text-4xl text-white font-black tracking-wider flex items-center gap-3">
          ABOUT <span className="bg-gradient-to-r from-cyber-neon to-cyber-magenta bg-clip-text text-transparent">ME</span>
        </h2>
      </div>

      {/* Main Glass Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Bio card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 glass-panel p-8 sm:p-10 flex flex-col gap-6 relative overflow-hidden group"
        >
          {/* Subtle light sheen on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />

          {/* Subheader readout */}
          <div className="flex items-center justify-between border-b border-[rgba(138,63,252,0.15)] pb-4">
            <span className="font-mono text-xs text-gray-500">ID: SYSTEM_ARCHITECT // ROOT</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <h3 className="font-orbitron font-bold text-xl text-white tracking-wide">
            Gameplay Systems Engineer & Worldsmith
          </h3>

          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            I am Twasy, a senior gameplay developer specializing in low-level game engine mechanics, fluid controls, AI sensory graphs, and state synchronization. My approach fuses rigorous math with cinematic artistry to design games that feel highly tactile, polished, and responsive.
          </p>

          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Whether weaving complex animation state-machines in custom C++ setups, developing bespoke physics plugins in Unity, or programming spatial queries inside Unreal Engine, I optimize for the absolute limits of hardware throughput. Let's engineer the next generation of play.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-[rgba(138,63,252,0.15)]">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyber-magenta shrink-0 mt-0.5" />
              <div>
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Low Latency</h4>
                <p className="text-xs text-gray-400">Zero-allocation state systems</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyber-neon shrink-0 mt-0.5" />
              <div>
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Multi-Platform</h4>
                <p className="text-xs text-gray-400">Optimized PC, Console & Web</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Liquid Glass Orb Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center items-center py-6"
        >
          {/* Glass Orb container with physical layered shadows */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyber-neon/20 via-cyber-magenta/20 to-white/10 blur-[30px] animate-pulse-slow" />

            {/* Moving refraction helper circles */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-2 rounded-full border border-dashed border-cyber-neon/20"
            />

            {/* Liquid Glass Orb */}
            <div
              className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-tr from-cyber-purple/50 via-white/5 to-white/15 backdrop-blur-3xl shadow-[0_15px_45px_rgba(0,0,0,0.6),_inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-10px_30px_rgba(138,63,252,0.15)] overflow-hidden flex items-center justify-center group"
            >
              {/* Inner diagonal sweeping sheen */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              {/* The "Profile Image" (Cybernetic Hologram Avatar) rendered in pristine high-contrast SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-44 h-44 sm:w-48 sm:h-48 drop-shadow-[0_0_15px_rgba(138,63,252,0.4)] opacity-85 group-hover:scale-105 transition-transform duration-500"
                fill="none"
              >
                {/* Microchip tracks in background of orb */}
                <path
                  d="M 10,50 L 30,50 L 40,40 L 40,10 M 90,50 L 70,50 L 60,60 L 60,90"
                  stroke="rgba(138, 63, 252, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Abstract Glowing Head Chassis */}
                <circle cx="50" cy="35" r="16" stroke="url(#gamedev-grad)" strokeWidth="1.5" />
                
                {/* Cyber HUD elements around head */}
                <circle cx="50" cy="35" r="22" stroke="rgba(224, 75, 255, 0.3)" strokeWidth="0.75" strokeDasharray="5 15" className="animate-spin" style={{ transformOrigin: '50px 35px', animationDuration: '20s' }} />
                <path d="M 38,15 A 25 25 0 0 1 62,15" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                
                {/* Cyber Glasses / Visor */}
                <rect x="40" y="31" width="20" height="6" rx="2" fill="rgba(224, 75, 255, 0.2)" stroke="url(#gamedev-grad-magenta)" strokeWidth="1" />
                <line x1="42" y1="34" x2="58" y2="34" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1 1" />

                {/* Chest & Shoulder Chassis */}
                <path
                  d="M 28,78 C 28,68 36,60 44,58 L 56,58 C 64,60 72,68 72,78"
                  stroke="url(#gamedev-grad)"
                  strokeWidth="1.5"
                />
                
                {/* Inner power core node */}
                <circle cx="50" cy="62" r="3" fill="#E04BFF" className="animate-pulse" />
                
                {/* Linear Gradients definitions */}
                <defs>
                  <linearGradient id="gamedev-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8A3FFC" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <linearGradient id="gamedev-grad-magenta" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E04BFF" />
                    <stop offset="100%" stopColor="#8A3FFC" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Top reflection highlight layer (gives physical crystal depth) */}
              <div className="absolute top-2 left-6 right-6 h-12 rounded-full bg-gradient-to-b from-white/25 to-transparent filter blur-[1px] pointer-events-none" />
              <div className="absolute bottom-2 left-10 right-10 h-6 rounded-full bg-gradient-to-t from-cyber-neon/15 to-transparent filter blur-[2px] pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three Glowing Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className={`glass-panel glass-panel-hover p-6 flex flex-col gap-3 relative overflow-hidden group border-b-2 border-b-transparent hover:border-b-cyber-magenta/40`}
          >
            {/* Colored spot light in card corner */}
            <div
              className="absolute -right-4 -top-4 w-12 h-12 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: stat.color.replace("0.4", "1") }}
            />

            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-widest">
                {stat.title}
              </span>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyber-neon/30 transition-colors">
                {stat.icon}
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <span className="font-orbitron font-extrabold text-3xl text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-gray-400 font-sans tracking-wide mt-1">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
