import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, Clock3 } from "lucide-react";
import { EXPERIENCE, EARLIER_ROLES } from "@/data/portfolio";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export default function Experience() {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <section id="experience" data-testid="experience-section" className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-6xl mx-auto">
      <SectionHeader overline="The Timeline" title="Every chapter added a new perspective." description="A growing career across agency environments, brand communication and digital marketing." testId="experience-header" />
      <div className="mt-14 relative">
        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#7C3AED]/70 via-[#06B6D4]/30 to-transparent" />
        <ul className="space-y-10">
          {EXPERIENCE.map((exp, index) => (
            <motion.li key={exp.company + exp.period} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08, duration: 0.55 }} className="relative pl-10 md:pl-14">
              <span className="absolute left-1.5 md:left-3.5 top-1.5 w-5 h-5 rounded-full bg-[#0F172A] border border-[#7C3AED]/60 grid place-items-center">
                {exp.upcoming ? <Clock3 size={10} className="text-[#67E8F9]" /> : <Briefcase size={10} className="text-[#A78BFA]" />}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-white tracking-tight">{exp.role}</h3>
                  <div className="text-sm text-[#94A3B8] mt-1">{exp.company}</div>
                </div>
                <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#06B6D4]">{exp.period}</div>
              </div>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {exp.bullets.map((bullet) => <li key={bullet} className="text-sm text-[#94A3B8] leading-relaxed flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-[#7C3AED] shrink-0" />{bullet}</li>)}
              </ul>
            </motion.li>
          ))}
        </ul>
        <div className="mt-9 pl-10 md:pl-14">
          <button data-testid="earlier-roles-toggle" onClick={() => setShowEarlier((value) => !value)} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#94A3B8] hover:text-white transition-colors">
            {showEarlier ? "Hide earlier chapter" : "Show earlier chapter"} <ChevronDown size={14} className={`transition-transform ${showEarlier ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showEarlier && <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="mt-5 overflow-hidden">
              {EARLIER_ROLES.map((exp) => <li key={exp.role} className="text-sm text-[#94A3B8]"><div className="text-white font-medium">{exp.role}</div><div className="text-xs text-[#64748B] font-mono mt-1">{exp.company} · {exp.period}</div>{exp.bullets.map((bullet) => <p key={bullet} className="mt-2 text-xs">— {bullet}</p>)}</li>)}
            </motion.ul>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
