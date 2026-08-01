import { motion } from "motion/react";
import { useMemo } from "react";

const TINTS = ["var(--rose)", "var(--rose-soft)", "var(--rose-deep)", "var(--gold)", "var(--sage)"];

export function PetalBurst({ count = 40 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.2;
        const dist = 140 + ((i * 37) % 220);
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.9 + 120,
          size: 10 + ((i * 7) % 14),
          rotate: (i * 53) % 360,
          tint: TINTS[i % TINTS.length]!,
          delay: (i % 8) * 0.04,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map((b) => (
        <motion.svg
          key={b.id}
          aria-hidden
          viewBox="0 0 24 24"
          width={b.size}
          height={b.size}
          className="absolute left-1/2 top-1/2"
          style={{ color: b.tint }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ x: b.x, y: b.y, opacity: [0, 1, 1, 0], scale: 1, rotate: b.rotate }}
          transition={{ duration: 2.2, delay: b.delay, ease: "easeOut" }}
        >
          <path
            d="M12 1c5 3.6 7.5 7.3 7.5 11.1C19.5 17.6 16.1 21 12 23c-4.1-2-7.5-5.4-7.5-10.9C4.5 8.3 7 4.6 12 1z"
            fill="currentColor"
          />
        </motion.svg>
      ))}
    </div>
  );
}
