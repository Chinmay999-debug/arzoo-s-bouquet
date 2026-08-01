import { motion } from "motion/react";
import { useState } from "react";

const LABELS = ["No", "Are you sure?", "Really?", "Last chance…"];

export function NoButton({ onAttempt }: { onAttempt: (n: number) => void }) {
  const [n, setN] = useState(0);

  const escalate = () => {
    if (n >= 4) return;
    const next = n + 1;
    setN(next);
    onAttempt(next);
  };

  if (n >= 4) return null;

  const offsets = [
    { x: 0, y: 0 },
    { x: 96, y: -18 },
    { x: -84, y: 22 },
    { x: 60, y: 40 },
  ];
  const o = offsets[n]!;

  return (
    <motion.button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        escalate();
      }}
      onMouseEnter={escalate}
      animate={{
        x: o.x,
        y: o.y,
        scale: [1, 1, 0.72, 0.5][n],
        opacity: [1, 1, 0.75, 0.3][n],
      }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className="rounded-full border border-border bg-card px-8 py-3 text-lg text-muted-foreground shadow-sm"
    >
      {LABELS[n]}
    </motion.button>
  );
}
