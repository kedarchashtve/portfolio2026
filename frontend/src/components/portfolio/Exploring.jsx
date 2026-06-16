import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EXPLORING } from "@/data/portfolio";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export default function Exploring() {
  const gridRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, visible: false });

  const onMove = (e) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  return (
    <section
      id="exploring"
      data-testid="exploring-section"
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto"
    >
      <SectionHeader
        overline="Currently Exploring"
        title="The next loop I'm sharpening."
        description="What I'm researching, prototyping and testing in the open right now."
        testId="exploring-header"
      />

      <div
        ref={gridRef}
        onMouseMove={onMove}
        onMouseLeave={() => setCoords((c) => ({ ...c, visible: false }))}
        className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-testid="exploring-grid"
      >
        {coords.visible && (
          <div
            className="pointer-events-none absolute w-72 h-72 rounded-full blur-3xl opacity-40 transition-opacity"
            style={{
              left: coords.x - 144,
              top: coords.y - 144,
              background:
                "radial-gradient(circle, rgba(124,58,237,0.35), transparent 60%)",
            }}
          />
        )}

        {EXPLORING.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -4 }}
            data-testid={`exploring-card-${i}`}
            className="relative rounded-3xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-md p-6 hover:border-white/25 transition-all"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#06B6D4]">
              <Sparkles size={12} />
              In Progress
            </div>
            <h3 className="font-display text-xl text-white tracking-tight mt-3">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
