import { motion } from "motion/react";
import { useMemo } from "react";

function Petal({ delay, x, size, duration, tint }: { delay: number; x: number; size: number; duration: number; tint: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="absolute top-[-10%]"
      style={{ left: `${x}%`, color: tint }}
      initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
      animate={{
        y: "115vh",
        opacity: [0, 0.85, 0.85, 0],
        rotate: [0, 140, 320],
        x: [0, 26, -20, 12, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M12 1c5 3.6 7.5 7.3 7.5 11.1C19.5 17.6 16.1 21 12 23c-4.1-2-7.5-5.4-7.5-10.9C4.5 8.3 7 4.6 12 1z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

export function Petals({ count = 16 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 37) % 100,
        size: 12 + ((i * 7) % 16),
        delay: (i * 1.7) % 20,
        duration: 18 + ((i * 5) % 16),
        tint: ["var(--rose)", "var(--rose-soft)", "var(--gold)", "var(--sage)"][i % 4]!,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  );
}
