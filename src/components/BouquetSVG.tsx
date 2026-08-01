import { motion } from "motion/react";

type Bloom = {
  x: number;
  y: number;
  r: number;
  petals: number;
  color: string;
  core: string;
  stem: string;
};

const BLOOMS: Bloom[] = [
  { x: 200, y: 96, r: 36, petals: 8, color: "var(--rose)", core: "var(--gold)", stem: "M200 430 C 200 330, 198 200, 200 130" },
  { x: 116, y: 138, r: 30, petals: 7, color: "var(--rose-deep)", core: "var(--gold)", stem: "M200 430 C 178 330, 132 220, 116 170" },
  { x: 286, y: 144, r: 31, petals: 7, color: "var(--rose-soft)", core: "var(--rose-deep)", stem: "M200 430 C 224 332, 272 224, 286 176" },
  { x: 64, y: 218, r: 24, petals: 6, color: "var(--rose-soft)", core: "var(--gold)", stem: "M200 430 C 164 372, 92 282, 66 244" },
  { x: 336, y: 226, r: 24, petals: 6, color: "var(--rose)", core: "var(--gold)", stem: "M200 430 C 238 372, 312 288, 334 252" },
  { x: 150, y: 236, r: 21, petals: 6, color: "var(--gold)", core: "var(--rose-deep)", stem: "M200 430 C 186 366, 156 288, 150 260" },
  { x: 252, y: 246, r: 21, petals: 6, color: "var(--rose-deep)", core: "var(--gold)", stem: "M200 430 C 214 368, 248 296, 252 270" },
];

const LEAVES = [
  "M198 330 C 150 318, 124 286, 118 258 C 160 262, 190 292, 198 330 Z",
  "M204 356 C 252 344, 280 312, 288 284 C 244 288, 214 318, 204 356 Z",
  "M200 392 C 168 388, 146 368, 140 348 C 172 352, 194 370, 200 392 Z",
];

const STEM_DELAY = 0.2;
const BLOOM_START = 1.2;
const BLOOM_STEP = 0.4; // 7 blooms ≈ 4s
const RIBBON_DELAY = BLOOM_START + BLOOM_STEP * BLOOMS.length + 0.3;

function Flower({ bloom, delay }: { bloom: Bloom; delay: number }) {
  const petals = Array.from({ length: bloom.petals }, (_, i) => i);
  const origin = `${bloom.x}px ${bloom.y}px`;
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0, rotate: -25 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: origin }}
    >
      <motion.g
        animate={{ rotate: [0, 3.5, -3.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
        style={{ transformOrigin: origin }}
      >
        {petals.map((i) => (
          <ellipse
            key={i}
            cx={bloom.x}
            cy={bloom.y - bloom.r * 0.52}
            rx={bloom.r * 0.36}
            ry={bloom.r * 0.62}
            fill={bloom.color}
            opacity={0.92}
            transform={`rotate(${(360 / bloom.petals) * i} ${bloom.x} ${bloom.y})`}
          />
        ))}
        {petals.map((i) => (
          <ellipse
            key={`i-${i}`}
            cx={bloom.x}
            cy={bloom.y - bloom.r * 0.28}
            rx={bloom.r * 0.24}
            ry={bloom.r * 0.36}
            fill={bloom.core}
            opacity={0.45}
            transform={`rotate(${(360 / bloom.petals) * i + 22} ${bloom.x} ${bloom.y})`}
          />
        ))}
        <circle cx={bloom.x} cy={bloom.y} r={bloom.r * 0.24} fill={bloom.core} />
      </motion.g>
    </motion.g>
  );
}

export function BouquetSVG({ play }: { play: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--rose-soft) 85%, transparent) 0%, color-mix(in oklab, var(--gold) 25%, transparent) 45%, transparent 70%)",
        }}
      />
      <svg viewBox="0 0 400 560" className="h-auto w-full overflow-visible" role="img" aria-label="An animated bouquet of roses">
        {BLOOMS.map((b, i) => (
          <motion.path
            key={`stem-${i}`}
            d={b.stem}
            fill="none"
            stroke="var(--sage-deep)"
            strokeWidth={i === 0 ? 5 : 4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            initial={{ strokeDashoffset: 1 }}
            animate={play ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
            transition={{ duration: 1, delay: STEM_DELAY + i * 0.1, ease: "easeInOut" }}
          />
        ))}

        {LEAVES.map((d, i) => (
          <motion.path
            key={`leaf-${i}`}
            d={d}
            fill="var(--sage)"
            initial={{ scale: 0, opacity: 0 }}
            animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.9 + i * 0.18, duration: 0.5, ease: "backOut" }}
            style={{ transformOrigin: "200px 400px" }}
          />
        ))}

        {play &&
          BLOOMS.map((b, i) => (
            <Flower key={`bloom-${i}`} bloom={b} delay={BLOOM_START + i * BLOOM_STEP} />
          ))}

        <motion.path
          d="M200 430 L 268 400 L 300 470 L 200 545 L 100 470 L 132 400 Z"
          fill="var(--card)"
          stroke="var(--rose-soft)"
          strokeWidth={3}
          initial={{ opacity: 0, y: 18 }}
          animate={play ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: RIBBON_DELAY - 0.4, duration: 0.6 }}
        />

        <motion.path
          d="M124 452 C 160 470, 240 470, 276 452"
          fill="none"
          stroke="var(--rose-deep)"
          strokeWidth={9}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          animate={play ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
          transition={{ delay: RIBBON_DELAY, duration: 0.7, ease: "easeOut" }}
        />
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: RIBBON_DELAY + 0.55, type: "spring", stiffness: 200, damping: 12 }}
          style={{ transformOrigin: "200px 458px" }}
        >
          <path d="M200 456 C 176 428, 138 430, 142 452 C 146 474, 180 472, 200 456 Z" fill="var(--rose-deep)" />
          <path d="M200 456 C 224 428, 262 430, 258 452 C 254 474, 220 472, 200 456 Z" fill="var(--rose-deep)" />
          <circle cx="200" cy="458" r="7" fill="var(--gold)" />
        </motion.g>
      </svg>
    </div>
  );
}
