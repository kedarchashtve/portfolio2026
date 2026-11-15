import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(`${API}/case-studies`);
        if (!cancelled) setItems(data || []);
      } catch (error) {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="case-studies" data-testid="case-studies-section" className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionHeader
        overline="Selected Work & Thinking"
        title="Different briefs. One thing in common."
        description="A look at the kind of marketing problems, creative directions and systems I enjoy working on. Client-specific details stay private."
        testId="case-studies-header"
      />
      <div className="mt-12 mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#64748B]">
        <Layers3 size={13} className="text-[#A78BFA]" />
        <span>Capability snapshots · Anonymised where needed</span>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-5">{[0,1,2].map((n) => <div key={n} className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />)}</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.article key={item.slug || index} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08, duration: 0.55 }} className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A] p-7 hover:border-white/25 transition-colors">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: item.accent }} />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">Chapter 0{index + 1}</span>
                <ArrowUpRight size={17} className="text-[#64748B] group-hover:text-white transition-colors" />
              </div>
              <div className="relative mt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: item.accent }}>{item.subtitle}</p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight tracking-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">{item.tagline}</p>
              </div>
              <div className="relative mt-8 pt-4 border-t border-white/10 text-xs text-[#64748B]">{item.metric_label}</div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
