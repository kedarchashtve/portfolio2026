import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HERO_METRICS } from "@/data/portfolio";
import AnimatedDashboard from "@/components/portfolio/AnimatedDashboard";
import MagneticButton from "@/components/portfolio/MagneticButton";

const headline = ["Growth", "Marketing", "Strategist"];

function CountUp({ end, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} data-testid="metric-count">
      {val}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const wrapRef = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(20);
  const smx = useSpring(mx, { damping: 30, stiffness: 120 });
  const smy = useSpring(my, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(x);
      my.set(y);
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={wrapRef}
      data-testid="hero-section"
      className="relative pt-32 md:pt-40 pb-24 overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
      {/* Mouse-responsive glow */}
      <div className="absolute inset-0 mouse-glow pointer-events-none" />
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#7C3AED]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[420px] h-[420px] rounded-full bg-[#06B6D4]/10 blur-[120px] pointer-events-none" />

      <div className="relative px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-[#94A3B8] font-mono uppercase tracking-[0.18em]"
            data-testid="hero-badge"
          >
            <Sparkles size={12} className="text-[#7C3AED]" />
            Available for Growth Roles
          </motion.div>

          <h1
            data-testid="hero-headline"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter mt-6 leading-[1.02] text-white"
          >
            {headline.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block mr-3"
              >
                {w === "Strategist" ? (
                  <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                    {w}
                  </span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-xl leading-relaxed"
            data-testid="hero-subhead"
          >
            Helping brands grow through performance marketing, content systems, and
            AI-powered workflows.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-3 text-sm text-[#64748B] max-w-xl"
          >
            4+ years scaling brands across social, paid, SEO, email, and AI-assisted
            growth systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              as="a"
              href="#case-studies"
              data-testid="hero-cta-case-studies"
              className="bg-white text-[#050816] hover:bg-white/90 px-5 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2"
            >
              View Case Studies <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              data-testid="hero-cta-connect"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2"
            >
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          {/* Metric cards */}
          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
            data-testid="hero-metric-grid"
          >
            {HERO_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-4"
                data-testid={`metric-card-${i}`}
              >
                <div className="font-mono text-3xl md:text-4xl text-white font-medium tracking-tight">
                  <CountUp end={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#64748B]">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative h-[520px] lg:h-[600px] hidden md:block"
        >
          <AnimatedDashboard />
        </motion.div>
      </div>
    </section>
  );
}
