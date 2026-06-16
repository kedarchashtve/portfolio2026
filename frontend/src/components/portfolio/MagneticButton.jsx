import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — wraps children in a magnetic hover transform.
 * Renders <a> by default; pass `as="button"` for buttons.
 */
export default function MagneticButton({
  as = "a",
  children,
  className = "",
  strength = 18,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220 });
  const sy = useSpring(y, { damping: 18, stiffness: 220 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * strength;
    x.set(dx);
    y.set(dy);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = as === "button" ? motion.button : motion.a;

  return (
    <Comp
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-btn ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
