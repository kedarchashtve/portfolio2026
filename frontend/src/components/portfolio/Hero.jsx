import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Clapperboard } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export default function Hero() {
  const wrapRef = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const smx = useSpring(mx, { damping: 30, stiffness: 100 });
  const smy = useSpring(my, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      mx.set(x);
      my.set(y);
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section id="top" ref={wrapRef} data-testid="hero-section" className="relative min-h-[92vh] flex items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-70" />
      <div className="absolute inset-0 mouse-glow pointer-events-none" />
      <div className="absolute -top-48 right-[-8rem] w-[38rem] h-[38rem] rounded-full bg-[#7C3AED]/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15rem] left-[-8rem] w-[34rem] h-[34rem] rounded-full bg-[#06B6D4]/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.24em] text-[#94A3B8]">
            <Clapperboard size={14} className="text-[#A78BFA]" />
            <span>Personal portfolio · Season 01</span>
            <span className="h-px w-10 bg-white/20" />
            <span>Marketing / Creative / Growth</span>
          </div>

          <div className="mt-9 max-w-5xl">
            <p className="font-mono text-sm md:text-base text-[#06B6D4] tracking-[0.12em] uppercase">The story so far</p>
            <h1 data-testid="hero-headline" className="font-display mt-5 text-[clamp(3.5rem,10vw,8.8rem)] leading-[0.86] tracking-[-0.075em] font-medium text-white">
              Kedar<br />
              <span className="bg-gradient-to-r from-[#C4B5FD] via-[#8B5CF6] to-[#67E8F9] bg-clip-text text-transparent">Chashtve.</span>
            </h1>
            <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-8 items-end">
              <p data-testid="hero-subhead" className="max-w-2xl text-lg md:text-2xl leading-relaxed text-[#CBD5E1]">
                I work where <span className="text-white">marketing meets storytelling.</span> From shaping brand communication to building campaigns and creating content that people want to stop for.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#case-studies" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#050816] hover:bg-[#E2E8F0] transition-colors">
                  Explore the work <ArrowUpRight size={16} />
                </a>
                <a href="#experience" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                  The timeline <ArrowDown size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.16em] text-[#64748B]">
            <span>{PROFILE.role}</span>
            <span>Based in Nashik, India · Working across ideas, media & growth</span>
            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[#C4B5FD] hover:text-white transition-colors">View résumé ↗</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
