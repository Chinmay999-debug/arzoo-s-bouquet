import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const CARDS = [
  {
    emoji: "🍜",
    title: "I make excellent 2 a.m. noodles",
    body: "Extra egg, exactly the way you like. No questions, no judgement.",
  },
  {
    emoji: "🎧",
    title: "Your personal playlist algorithm",
    body: "I have never once recommended a song you skipped in under 10 seconds.",
  },
  {
    emoji: "📸",
    title: "Official photographer",
    body: "I take 47 photos so you can pick the one. That is devotion.",
  },
  {
    emoji: "🕷️",
    title: "Certified bug remover",
    body: "Both kinds. In the house and in your phone.",
  },
  {
    emoji: "🤝",
    title: "I admit when I'm wrong",
    body: "Slowly. Dramatically. But eventually, and with flowers. See above.",
  },
];

export function ReasonCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / (el.clientWidth * 0.82));
      setActive(Math.max(0, Math.min(CARDS.length - 1, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {CARDS.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="w-[78%] shrink-0 snap-center rounded-3xl border border-border bg-card p-7 shadow-petal sm:w-[46%] lg:w-[31%]"
          >
            <span className="text-3xl" aria-hidden>
              {c.emoji}
            </span>
            <h3 className="mt-4 text-2xl leading-tight text-primary">{c.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-balance-pretty">
              {c.body}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {CARDS.map((c, i) => (
          <button
            key={c.title}
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-7 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
