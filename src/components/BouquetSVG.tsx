import { motion } from "motion/react";

type Bloom = {
  x: number;
  y: number;
  r: number;
  petals: number;
  color: string;
  colorDeep: string;
  core: string;
  stem: string;
};

const BLOOMS: Bloom[] = [
  { x: 200, y: 92, r: 38, petals: 6, color: "var(--rose)", colorDeep: "var(--rose-deep)", core: "var(--gold)", stem: "M200 440 C 200 340, 198 200, 200 128" },
  { x: 114, y: 136, r: 31, petals: 6, color: "var(--rose-deep)", colorDeep: "var(--rose)", core: "var(--gold)", stem: "M200 440 C 176 338, 130 218, 114 168" },
  { x: 288, y: 142, r: 32, petals: 6, color: "var(--rose-soft)", colorDeep: "var(--rose)", core: "var(--rose-deep)", stem: "M200 440 C 226 340, 274 222, 288 174" },
  { x: 60, y: 220, r: 25, petals: 5, color: "var(--rose-soft)", colorDeep: "var(--rose)", core: "var(--gold)", stem: "M200 440 C 162 380, 88 284, 62 246" },
  { x: 340, y: 228, r: 25, petals: 5, color: "var(--rose)", colorDeep: "var(--rose-deep)", core: "var(--gold)", stem: "M200 440 C 240 380, 314 290, 338 254" },
  { x: 148, y: 240, r: 21, petals: 5, color: "var(--gold)", colorDeep: "var(--rose-deep)", core: "var(--rose-deep)", stem: "M200 440 C 184 372, 154 292, 148 264" },
  { x: 254, y: 250, r: 21, petals: 5, color: "var(--rose-deep)", colorDeep: "var(--rose)", core: "var(--gold)", stem: "M200 440 C 216 374, 250 298, 254 274" },
];

const LEAVES = [
  "M198 336 C 148 322, 120 288, 114 258 C 158 262, 190 294, 198 336 Z",
  "M206 362 C 256 348, 284 314, 292 284 C 246 288, 216 320, 206 362 Z",
  "M200 400 C 166 396, 142 374, 136 352 C 170 356, 194 376, 200 400 Z",
];

const STEM_DELAY = 0.1;
const BLOOM_START = 0.3;
const BLOOM_STEP = 0.09; // 7 blooms, all in under 1s
const RIBBON_DELAY = BLOOM_START + BLOOM_STEP * BLOOMS.length + 0.15;

function petalPath(r: number, w: number) {
  return `M0 0 C ${-w} ${-r * 0.3} ${-w * 0.58} ${-r * 0.82} 0 ${-r} C ${w * 0.58} ${-r * 0.82} ${w} ${-r * 0.3} 0 0 Z`;
}

function Flower({ bloom, play, delay }: { bloom: Bloom; play: boolean; delay: number }) {
  const petals = Array.from({ length: bloom.petals }, (_, i) => i);
  const origin = `${bloom.x}px ${bloom.y}px`;
  const outer = petalPath(bloom.r, bloom.r * 0.5);
  const inner = petalPath(bloom.r * 0.62, bloom.r * 0.4);

  return (
    <motion.g
      initial={false}
      animate={play ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -20 }}
      transition={{ delay: play ? delay : 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: origin }}
    >
      <circle cx={bloom.x} cy={bloom.y} r={bloom.r * 0.9} fill={bloom.color} opacity={0.14} />
      {petals.map((i) => (
        <path
          key={`o-${i}`}
          d={outer}
          fill={bloom.color}
          transform={`translate(${bloom.x} ${bloom.y}) rotate(${(360 / bloom.petals) * i})`}
        />
      ))}
      {petals.map((i) => (
        <path
          key={`inr-${i}`}
          d={inner}
          fill={bloom.colorDeep}
          opacity={0.55}
          transform={`translate(${bloom.x} ${bloom.y}) rotate(${(360 / bloom.petals) * i + 360 / bloom.petals / 2})`}
        />
      ))}
      <circle cx={bloom.x} cy={bloom.y} r={bloom.r * 0.2} fill={bloom.core} />
      <circle cx={bloom.x} cy={bloom.y} r={bloom.r * 0.08} fill="var(--rose-deep)" opacity={0.5} />
    </motion.g>
  );
}

export function BouquetSVG({ play }: { play: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--rose-soft) 80%, transparent) 0%, color-mix(in oklab, var(--gold) 22%, transparent) 45%, transparent 70%)",
        }}
      />
      <svg viewBox="0 0 400 560" className="h-auto w-full overflow-visible" role="img" aria-label="An animated bouquet of roses">
        {/* one gentle sway for the whole bouquet instead of per-flower loops */}
        <motion.g
          animate={play ? { rotate: [0, 1.4, -1.4, 0] } : { rotate: 0 }}
          transition={{ duration: 8, repeat: play ? Infinity : 0, ease: "easeInOut", delay: RIBBON_DELAY + 0.6 }}
          style={{ transformOrigin: "200px 480px" }}
        >
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
              initial={false}
              animate={play ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
              transition={{ duration: 0.6, delay: play ? STEM_DELAY + i * 0.05 : 0, ease: "easeInOut" }}
            />
          ))}

          {LEAVES.map((d, i) => (
            <motion.path
              key={`leaf-${i}`}
              d={d}
              fill="var(--sage)"
              initial={false}
              animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: play ? 0.3 + i * 0.08 : 0, duration: 0.35, ease: "backOut" }}
              style={{ transformOrigin: "200px 410px" }}
            />
          ))}

          {BLOOMS.map((b, i) => (
            <Flower key={`bloom-${i}`} bloom={b} play={play} delay={BLOOM_START + i * BLOOM_STEP} />
          ))}

          {/* paper wrap */}
          <motion.path
            d="M182 428 L 218 428 L 296 546 L 104 546 Z"
            fill="var(--card)"
            stroke="var(--rose-soft)"
            strokeWidth={3}
            strokeLinejoin="round"
            initial={false}
            animate={play ? { opacity: 0.97, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: play ? RIBBON_DELAY - 0.2 : 0, duration: 0.4 }}
          />
          <motion.path
            d="M200 428 L 182 428 L 104 546 L 200 546 Z"
            fill="var(--rose-soft)"
            initial={false}
            animate={play ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ delay: play ? RIBBON_DELAY - 0.1 : 0, duration: 0.4 }}
          />
          <motion.path
            d="M195 432 L 141 546 M205 432 L 259 546"
            stroke="var(--rose-soft)"
            strokeWidth={1.5}
            initial={false}
            animate={play ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ delay: play ? RIBBON_DELAY : 0, duration: 0.4 }}
          />

          {/* ribbon band around the neck */}
          <motion.path
            d="M164 458 C 184 466, 216 466, 236 458 L 250 494 C 226 486, 174 486, 150 494 Z"
            fill="var(--rose-deep)"
            initial={false}
            animate={play ? { opacity: 0.96, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
            transition={{ delay: play ? RIBBON_DELAY + 0.1 : 0, duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: "200px 476px" }}
          />
          <motion.path
            d="M164 458 C 184 466, 216 466, 236 458"
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.5}
            initial={false}
            animate={play ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: play ? RIBBON_DELAY + 0.2 : 0, duration: 0.3 }}
          />

          {/* bow */}
          <motion.g
            initial={false}
            animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: play ? RIBBON_DELAY + 0.35 : 0, type: "spring", stiffness: 260, damping: 14 }}
            style={{ transformOrigin: "200px 474px" }}
          >
            <path d="M200 472 C 178 448, 140 450, 143 470 C 146 490, 180 488, 200 472 Z" fill="var(--rose-deep)" stroke="var(--gold)" strokeWidth={1} />
            <path d="M200 472 C 222 448, 260 450, 257 470 C 254 490, 220 488, 200 472 Z" fill="var(--rose-deep)" stroke="var(--gold)" strokeWidth={1} />
            <path d="M188 470 L 178 498 L 192 492 Z" fill="var(--rose-deep)" />
            <path d="M212 470 L 222 498 L 208 492 Z" fill="var(--rose-deep)" />
            <circle cx="200" cy="474" r="8" fill="var(--gold)" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
