import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Download, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import MagneticButton from "@/components/portfolio/MagneticButton";

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative px-6 md:px-12 lg:px-24 py-28 md:py-40 max-w-5xl mx-auto"
    >
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[640px] h-[640px] rounded-full bg-[#7C3AED]/10 blur-[140px]" />
      </div>

      <div className="relative text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#06B6D4] mb-5">
          Contact
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.02]"
          data-testid="contact-headline"
        >
          Let&apos;s build growth that{" "}
          <span className="bg-gradient-to-r from-[#A78BFA] to-[#06B6D4] bg-clip-text text-transparent">
            matters.
          </span>
        </motion.h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#94A3B8]">
          {[
            "Full-time roles",
            "Growth Marketing",
            "Freelance projects",
            "Consulting",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs"
            >
              ✓ {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href={`mailto:${PROFILE.email}`}
            data-testid="contact-email-btn"
            className="bg-white text-[#050816] hover:bg-white/90 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2"
          >
            <Mail size={15} />
            {PROFILE.email}
          </MagneticButton>
          <MagneticButton
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-linkedin-btn"
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2"
          >
            <Linkedin size={15} />
            LinkedIn
            <ArrowUpRight size={14} className="opacity-70" />
          </MagneticButton>
          <MagneticButton
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            data-testid="contact-resume-btn"
            className="bg-[#7C3AED]/15 border border-[#7C3AED]/40 hover:bg-[#7C3AED]/25 text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2"
          >
            <Download size={15} />
            Download Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
