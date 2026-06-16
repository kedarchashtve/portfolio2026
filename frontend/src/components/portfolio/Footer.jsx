import React from "react";
import { PROFILE } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 px-6 md:px-12 lg:px-24 py-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
        <span>© {new Date().getFullYear()} {PROFILE.name}. Built with intent.</span>
        <span>Growth Marketing Strategist · India</span>
      </div>
    </footer>
  );
}
