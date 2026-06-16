import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Pen, Send, LineChart, ArrowRight } from "lucide-react";
import { FRAMEWORK_STEPS } from "@/data/portfolio";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const ICONS = { Search, Compass, Pen, Send, LineChart };

export default function GrowthFramework() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="framework"
      data-testid="framework-section"
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto"
    >
      <SectionHeader
        overline="How I Think"
        title="My Growth Framework."
        description="Every brand I work with runs through the same five-stage operating system — sharpened with AI workflows at each stage."
        testId="framework-header"
      />

      {/* Desktop horizontal flow */}
      <div className="mt-14 hidden lg:block">
        <div className="relative grid grid-cols-5 gap-4">
          {/* Animated connector underneath */}
          <svg
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-12 pointer-events-none"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <path
              d="M40,30 C200,5 400,55 600,30 C800,5 950,40 970,30"
              stroke="rgba(124,58,237,0.45)"
              strokeWidth="1.5"
              fill="none"
              className="dash-anim"
            />
          </svg>

          {FRAMEWORK_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const isActive = active === i;
            return (
              <motion.div
                key={step.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                data-testid={`framework-node-${step.key}`}
                whileHover={{ y: -6 }}
                className={`relative z-10 rounded-3xl border p-5 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-white/30 bg-[#0F172A] shadow-[0_20px_60px_rgba(124,58,237,0.18)]"
                    : "border-white/10 bg-[#0F172A]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl grid place-items-center transition-colors ${
                      isActive
                        ? "bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/50"
                        : "bg-white/5 text-[#94A3B8] border border-white/10"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-[0.18em]">
                    0{i + 1}
                  </span>
                </div>
                <div className="font-display text-lg text-white tracking-tight">
                  {step.title}
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-1.5 overflow-hidden"
                    >
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-xs text-[#94A3B8] flex items-center gap-2"
                        >
                          <ArrowRight size={11} className="text-[#7C3AED]" />
                          {b}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile/tablet vertical flow */}
      <div className="mt-12 lg:hidden space-y-3">
        {FRAMEWORK_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <div
              key={step.key}
              data-testid={`framework-node-mobile-${step.key}`}
              className="rounded-2xl border border-white/10 bg-[#0F172A] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl grid place-items-center bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-[0.18em]">
                    0{i + 1}
                  </div>
                  <div className="font-display text-lg text-white tracking-tight">
                    {step.title}
                  </div>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {step.bullets.map((b) => (
                  <li key={b} className="text-xs text-[#94A3B8] flex items-center gap-2">
                    <ArrowRight size={11} className="text-[#7C3AED]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
