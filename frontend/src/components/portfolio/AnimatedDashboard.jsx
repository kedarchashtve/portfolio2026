import React from "react";
import { motion } from "framer-motion";
import { Activity, Users, Mail, Zap, TrendingUp } from "lucide-react";

const GRAPH_PATH = "M0,80 C30,70 50,40 80,38 C110,36 130,60 160,52 C190,45 210,18 240,14";

export default function AnimatedDashboard() {
  return (
    <div
      data-testid="animated-dashboard"
      className="absolute inset-0"
      aria-hidden="true"
    >
      {/* Soft accent halo */}
      <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#06B6D4]/15 blur-3xl" />

      {/* Big growth chart card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: [0, -8, 0], opacity: 1 }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.8 },
        }}
        className="absolute top-0 left-2 right-8 glass rounded-3xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 grid place-items-center">
              <TrendingUp size={14} className="text-[#A78BFA]" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#94A3B8]">
              Growth · Q4
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">
            +47%
          </span>
        </div>
        <svg viewBox="0 0 240 90" className="w-full h-24">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${GRAPH_PATH} L240,90 L0,90 Z`}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <motion.path
            d={GRAPH_PATH}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {[
            { x: 0, y: 80 },
            { x: 80, y: 38 },
            { x: 160, y: 52 },
            { x: 240, y: 14 },
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#F8FAFC"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 + i * 0.15 }}
            />
          ))}
        </svg>
        <div className="flex justify-between mt-2 text-[10px] font-mono text-[#64748B]">
          <span>W1</span>
          <span>W4</span>
          <span>W8</span>
          <span>W12</span>
        </div>
      </motion.div>

      {/* Funnel viz */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: [0, 8, 0], opacity: 1 }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          opacity: { duration: 0.8, delay: 0.3 },
        }}
        className="absolute bottom-4 left-0 glass rounded-3xl p-4 w-[220px]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Users size={14} className="text-[#06B6D4]" />
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#94A3B8]">
            Funnel
          </span>
        </div>
        {[
          { label: "Reach", w: "100%", color: "#7C3AED" },
          { label: "Engaged", w: "72%", color: "#A78BFA" },
          { label: "Leads", w: "44%", color: "#22D3EE" },
          { label: "Converted", w: "18%", color: "#06B6D4" },
        ].map((row, i) => (
          <div key={row.label} className="mb-2 last:mb-0">
            <div className="flex justify-between text-[10px] font-mono text-[#94A3B8] mb-1">
              <span>{row.label}</span>
              <span>{row.w}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: row.w }}
                transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: row.color }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI workflow nodes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute right-0 bottom-2 glass rounded-3xl p-4 w-[230px]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-[#A78BFA]" />
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#94A3B8]">
            AI Workflow
          </span>
        </div>
        <svg viewBox="0 0 200 140" className="w-full">
          {/* Connectors */}
          <path
            d="M30,30 C60,30 60,70 100,70"
            stroke="#7C3AED"
            strokeWidth="1.2"
            fill="none"
            strokeOpacity="0.5"
            className="dash-anim"
          />
          <path
            d="M30,110 C60,110 60,70 100,70"
            stroke="#06B6D4"
            strokeWidth="1.2"
            fill="none"
            strokeOpacity="0.5"
            className="dash-anim"
          />
          <path
            d="M100,70 C140,70 140,40 175,40"
            stroke="#A78BFA"
            strokeWidth="1.2"
            fill="none"
            strokeOpacity="0.5"
            className="dash-anim"
          />
          <path
            d="M100,70 C140,70 140,100 175,100"
            stroke="#22D3EE"
            strokeWidth="1.2"
            fill="none"
            strokeOpacity="0.5"
            className="dash-anim"
          />
          {/* Nodes */}
          {[
            { x: 30, y: 30, c: "#7C3AED", l: "Research" },
            { x: 30, y: 110, c: "#06B6D4", l: "Brief" },
            { x: 100, y: 70, c: "#F8FAFC", l: "Agent" },
            { x: 175, y: 40, c: "#A78BFA", l: "Copy" },
            { x: 175, y: 100, c: "#22D3EE", l: "Report" },
          ].map((n) => (
            <g key={n.l}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="6"
                fill={n.c}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                fillOpacity="0.9"
              />
              <text
                x={n.x}
                y={n.y - 10}
                fontSize="8"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fill="#94A3B8"
              >
                {n.l}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Small KPI chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute top-44 right-0 glass rounded-2xl px-3 py-2 flex items-center gap-2"
      >
        <Activity size={14} className="text-[#22D3EE]" />
        <div>
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em]">
            ROAS
          </div>
          <div className="text-sm font-mono text-white">4.2×</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="absolute top-56 left-4 glass rounded-2xl px-3 py-2 flex items-center gap-2"
      >
        <Mail size={14} className="text-[#A78BFA]" />
        <div>
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.14em]">
            CTR
          </div>
          <div className="text-sm font-mono text-white">6.7%</div>
        </div>
      </motion.div>
    </div>
  );
}
