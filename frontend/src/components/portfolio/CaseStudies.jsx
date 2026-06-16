import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(`${API}/case-studies`);
        if (!cancelled) setItems(data || []);
      } catch (e) {
        if (!cancelled) setError("Failed to load case studies.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto"
    >
      <SectionHeader
        overline="Selected Case Studies"
        title="Proof, not promises."
        description="Three growth stories I'm proud of — built end-to-end across paid, organic, email, and AI-assisted workflows."
        testId="case-studies-header"
      />

      {loading && (
        <div
          data-testid="case-studies-loading"
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[420px] rounded-3xl border border-white/10 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div
          data-testid="case-studies-error"
          className="mt-10 text-sm text-red-400 font-mono"
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cs, idx) => (
            <CaseStudyCard key={cs.id || cs.slug} cs={cs} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}

function CaseStudyCard({ cs, index }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          data-testid={`case-study-card-${cs.slug}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08, duration: 0.6 }}
          whileHover={{ y: -6 }}
          className="group relative text-left overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A] hover:border-white/25 transition-all duration-300 focus:outline-none"
        >
          <div className="relative h-52 overflow-hidden">
            <img
              src={cs.image}
              alt={cs.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
            <div
              className="absolute inset-0 opacity-60 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${cs.accent}40, transparent 60%)`,
              }}
            />
            <div className="absolute top-4 left-4 text-[11px] font-mono uppercase tracking-[0.18em] text-white/70">
              0{index + 1} · {cs.subtitle}
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md grid place-items-center text-white/70 group-hover:bg-white group-hover:text-[#050816] transition-all">
              <ArrowUpRight size={15} />
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-2xl text-white tracking-tight">
              {cs.title}
            </h3>
            <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
              {cs.tagline}
            </p>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#64748B]">
                  {cs.metric_label}
                </div>
                <div
                  className="font-mono text-3xl font-medium mt-0.5"
                  style={{ color: cs.accent }}
                >
                  {cs.metric_value}
                </div>
              </div>
              <span className="text-xs font-mono text-[#94A3B8] group-hover:text-white transition-colors">
                Read case study →
              </span>
            </div>
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent
        data-testid={`case-study-modal-${cs.slug}`}
        className="max-w-3xl bg-[#0F172A] border border-white/10 text-white p-0 max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-44 overflow-hidden">
          <img src={cs.image} alt={cs.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
          <div
            className="absolute inset-0 mix-blend-screen opacity-70"
            style={{
              background: `radial-gradient(circle at 70% 30%, ${cs.accent}55, transparent 60%)`,
            }}
          />
        </div>
        <div className="p-6 md:p-8">
          <DialogHeader>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#06B6D4]">
              {cs.subtitle}
            </div>
            <DialogTitle className="font-display text-3xl md:text-4xl tracking-tight mt-2">
              {cs.title}
            </DialogTitle>
            <DialogDescription className="text-[#94A3B8] mt-2">{cs.tagline}</DialogDescription>
          </DialogHeader>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <ModalBlock label="Problem" text={cs.problem} />
            <ModalBlock label="Strategy" text={cs.strategy} />
          </div>

          <div className="mt-6">
            <BlockHeader>Actions</BlockHeader>
            <ul className="mt-3 space-y-2">
              {cs.actions?.map((a) => (
                <li
                  key={a}
                  className="flex gap-3 text-[#E2E8F0] text-sm leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: cs.accent }}
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <BlockHeader>Results</BlockHeader>
            <ul className="mt-3 grid sm:grid-cols-2 gap-3">
              {cs.results?.map((r) => (
                <li
                  key={r}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-[#E2E8F0]"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <BlockHeader>Tools</BlockHeader>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.tools?.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#94A3B8]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BlockHeader({ children }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7C3AED]">
      {children}
    </div>
  );
}

function ModalBlock({ label, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <BlockHeader>{label}</BlockHeader>
      <p className="mt-3 text-sm text-[#E2E8F0] leading-relaxed">{text}</p>
    </div>
  );
}
