import React from "react";

export function SectionHeader({ overline, title, description, align = "left", testId }) {
  return (
    <div
      data-testid={testId}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {overline && (
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#06B6D4] mb-4">
          {overline}
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[#94A3B8] text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
