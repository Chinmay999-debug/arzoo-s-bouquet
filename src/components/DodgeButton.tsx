import { motion } from "motion/react";
import { useState } from "react";

const TAUNTS = [
  "No",
  "Nope?",
  "Try again",
  "Too slow",
  "Missed me",
  "Almost!",
  "Not today",
];

export function DodgeButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [i, setI] = useState(0);

  const dodge = () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 60;
    setPos({
      x: Math.max(-110, Math.min(110, Math.cos(angle) * dist)),
      y: Math.max(-70, Math.min(70, Math.sin(angle) * dist)),
    });
    setI((n) => (n + 1) % TAUNTS.length);
  };

  return (
    <motion.button
      type="button"
      onMouseEnter={dodge}
      onFocus={dodge}
      onTouchStart={dodge}
      onClick={dodge}
      animate={pos}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className="rounded-full border border-border bg-card px-7 py-3 text-lg text-muted-foreground shadow-sm"
    >
      {TAUNTS[i]}
    </motion.button>
  );
}
