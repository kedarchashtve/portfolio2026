import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "The Work", href: "#case-studies", testId: "nav-link-case-studies" },
  { label: "Approach", href: "#framework", testId: "nav-link-framework" },
  { label: "Timeline", href: "#experience", testId: "nav-link-experience" },
  { label: "Toolkit", href: "#skills", testId: "nav-link-skills" },
  { label: "Contact", href: "#contact", testId: "nav-link-contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav data-testid="primary-nav" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[min(94%,920px)]">
      <div className={`flex items-center justify-between gap-6 px-4 md:px-6 py-3 rounded-full border border-white/10 transition-all duration-300 ${scrolled ? "bg-[#0F172A]/85 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]" : "bg-[#0F172A]/45 backdrop-blur-xl"}`}>
        <a href="#top" data-testid="nav-brand" className="flex items-center gap-2.5 font-display font-medium text-[15px] tracking-tight">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C3AED]" /></span>
          Kedar Chashtve
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-[#94A3B8]">
          {LINKS.map((link) => <a key={link.href} href={link.href} data-testid={link.testId} className="hover:text-white transition-colors duration-200">{link.label}</a>)}
        </div>
        <a href="#contact" data-testid="nav-cta-connect" className="hidden md:inline-flex items-center gap-2 bg-white text-[#050816] hover:bg-white/90 transition-colors px-4 py-1.5 rounded-full text-sm font-medium">Say hello ↗</a>
        <button data-testid="nav-mobile-toggle" onClick={() => setOpen((value) => !value)} className="md:hidden text-white p-1.5 rounded-full hover:bg-white/10" aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-2xl p-4 flex flex-col gap-3" data-testid="nav-mobile-panel">
          {LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-[#F8FAFC]/90 hover:text-white text-sm py-1.5" data-testid={`mobile-${link.testId}`}>{link.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-1 bg-white text-[#050816] px-4 py-2 rounded-full text-sm font-medium text-center">Say hello ↗</a>
        </motion.div>}
      </AnimatePresence>
    </motion.nav>
  );
}
