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
  {
    x: 200,
    y: 92,
    r: 34,
    petals: 8,
    color: "var(--rose)",
    core: "var(--gold)",
    stem: "M200 430 C 200 330, 198 200, 200 126",
  },
  {
    x: 118,
    y: 132,
    r: 29,
    petals: 7,
    color: "var(--rose-deep)",
    core: "var(--gold)",
    stem: "M200 430 C 178 330, 132 220, 118 164",
  },
  {
    x: 284,
    y: 138,
    r: 30,
    petals: 7,
    color: "var(--rose-soft)",
    core: "var(--rose-deep)",
    stem: "M200 430 C 224 332, 272 224, 284 170",
  },
  {
    x: 66,
    y: 214,
    r: 24,
    petals: 6,
    color: "var(--rose-soft)",
    core: "var(--gold)",
    stem: "M200 430 C 164 372, 92 282, 68 240",
  },
  {
    x: 334,
    y: 222,
    r: 23,
    petals: 6,
    color: "var(--rose)",
    core: "var(--gold)",
    stem: "M200 430 C 238 372, 312 288, 334 248",
  },
  {
    x: 152,
    y: 232,
    r: 21,
    petals: 6,
    color: "var(--gold)",
    core: "var(--rose-deep)",
    stem: "M200 430 C 186 366, 158 288, 152 256",
  },
  {
    x: 250,
    y: 242,
    r: 20,
    petals: 6,
    color: "var(--rose-deep)",
    core: "var(--gold)",
    stem: "M200 430 C 214 368, 246 296, 250 266",
  },
];

const LEAVES = [
  { d: "M198 330 C 150 318, 124 286, 118 258 C 160 262, 190 292, 198 330 Z", delay: 0.5 },
  { d: "M204 356 C 252 344, 280 312, 288 284 C 244 288, 214 318, 204 356 Z", delay: 0.68 },
  { d: "M200 392 C 168 388, 146 368, 140 348 C 172 352, 194 370, 200 392 Z", delay: 0.86 },
];

function Flower({ bloom, delay }: { bloom: Bloom; delay: number }) {
  const petals = Array.from({ length: bloom.petals }, (_, i) => i);
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 12 }}
      style={{ transformOrigin: `${bloom.x}px ${bloom.y}px` }}
    >
      <motion.g
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ transformOrigin: `${bloom.x}px ${bloom.y}px` }}
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
            key={`inner-${i}`}
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

export function Bouquet({ play, message }: { play: boolean; message: string }) {
  const tagDelay = 3.1;

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 400 560" className="h-auto w-full overflow-visible" role="img" aria-label="An animated bouquet of roses">
        {/* stems */}
        {BLOOMS.map((b, i) => (
          <motion.path
            key={`stem-${i}`}
            d={b.stem}
            fill="none"
            stroke="var(--sage-deep)"
            strokeWidth={i === 0 ? 5 : 4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, delay: 0.15 + i * 0.13, ease: "easeInOut" }}
          />
        ))}

        {/* leaves */}
        {LEAVES.map((l, i) => (
          <motion.path
            key={`leaf-${i}`}
            d={l.d}
            fill="var(--sage)"
            initial={{ scale: 0, opacity: 0 }}
            animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1.1 + l.delay, duration: 0.5, ease: "backOut" }}
            style={{ transformOrigin: "200px 400px" }}
          />
        ))}

        {/* blooms */}
        {play &&
          BLOOMS.map((b, i) => <Flower key={`bloom-${i}`} bloom={b} delay={1.4 + i * 0.17} />)}

        {/* wrap */}
        <motion.path
          d="M200 430 L 268 400 L 300 470 L 200 545 L 100 470 L 132 400 Z"
          fill="var(--card)"
          stroke="var(--rose-soft)"
          strokeWidth={3}
          initial={{ opacity: 0, y: 20 }}
          animate={play ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        />

        {/* ribbon */}
        <motion.path
          d="M124 452 C 160 470, 240 470, 276 452"
          fill="none"
          stroke="var(--rose-deep)"
          strokeWidth={9}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 2.75, duration: 0.7, ease: "easeOut" }}
        />
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 3.3, type: "spring", stiffness: 200, damping: 12 }}
          style={{ transformOrigin: "200px 458px" }}
        >
          <path
            d="M200 456 C 176 428, 138 430, 142 452 C 146 474, 180 472, 200 456 Z"
            fill="var(--rose-deep)"
          />
          <path
            d="M200 456 C 224 428, 262 430, 258 452 C 254 474, 220 472, 200 456 Z"
            fill="var(--rose-deep)"
          />
          <circle cx="200" cy="458" r="7" fill="var(--gold)" />
        </motion.g>
      </svg>

      {/* gift tag */}
      <div className="mt-2 flex justify-center [perspective:1000px]">
        <motion.div
          className="relative h-40 w-60 [transform-style:preserve-3d]"
          initial={{ opacity: 0, rotateY: 0, y: -10 }}
          animate={play ? { opacity: 1, rotateY: 180, y: 0 } : { opacity: 0, rotateY: 0 }}
          transition={{ delay: tagDelay + 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-border bg-card shadow-petal [backface-visibility:hidden]">
            <span className="font-hand text-3xl text-muted-foreground">for you…</span>
          </div>
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-border bg-secondary px-6 text-center shadow-petal [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="font-hand text-2xl leading-snug text-primary">{message}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
