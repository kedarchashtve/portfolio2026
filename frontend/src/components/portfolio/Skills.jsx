import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CLUSTERS } from "@/data/portfolio";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto"
    >
      <SectionHeader
        overline="Core Skills"
        title="Not a tool list — a working stack."
        description="Hover any skill to see how I apply it in real campaigns."
        testId="skills-header"
      />

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {SKILL_CLUSTERS.map((cluster, idx) => (
          <Cluster key={cluster.title} cluster={cluster} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function Cluster({ cluster, idx }) {
  const [active, setActive] = useState(null);
  const safeKey = cluster.title.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: idx * 0.08, duration: 0.6 }}
      data-testid={`skill-cluster-${safeKey}`}
      className="relative rounded-3xl border border-white/10 bg-[#0F172A] p-8 overflow-hidden group hover:border-white/25 transition-colors"
    >
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: cluster.accent }}
      />
      <div className="relative flex items-center justify-between mb-5">
        <h3 className="font-display text-xl md:text-2xl text-white tracking-tight">
          {cluster.title}
        </h3>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: cluster.accent }}
        />
      </div>

      <ul className="relative space-y-1">
        {cluster.items.map((it) => (
          <li
            key={it.name}
            onMouseEnter={() => setActive(it.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(it.name)}
            tabIndex={0}
            data-testid={`skill-item-${safeKey}-${it.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            className="group/skill relative py-2.5 border-b border-white/5 last:border-b-0 cursor-default"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#E2E8F0] text-sm">{it.name}</span>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] group-hover/skill:text-white transition-colors"
              >
                {active === it.name ? "live" : "·"}
              </span>
            </div>
            <AnimatePresence>
              {active === it.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                    {it.example}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
