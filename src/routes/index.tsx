import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Petals } from "@/components/Petals";
import { BouquetSVG } from "@/components/BouquetSVG";
import { PetalBurst } from "@/components/PetalBurst";
import { NoButton } from "@/components/NoButton";
import { MusicToggle } from "@/components/MusicToggle";
import { notifyResponse } from "@/lib/notify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Something for You, Arzoo" },
      {
        name: "description",
        content: "A note, a bouquet, and one question for Arzoo.",
      },
      { property: "og:title", content: "Something for You, Arzoo" },
      {
        property: "og:description",
        content: "A note, a bouquet, and one question for Arzoo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NOTE =
  "I keep thinking about that call. You needed me and I wasn't really there for it, and that's on me, no excuses. I just really like talking to you. Your voice is genuinely the calmest part of my day, and I hate that I made it feel like it didn't matter to me. I want another shot at actually being there, properly, whenever you call.";

function Screen({
  children,
  onEnter,
  className = "",
}: {
  children: React.ReactNode;
  onEnter?: () => void;
  className?: string;
}) {
  return (
    <motion.section
      className={`relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => onEnter?.()}
    >
      {children}
    </motion.section>
  );
}

function Sprig() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 60 60"
      className="h-12 w-12 text-primary/70 sm:h-14 sm:w-14"
      initial={{ opacity: 0, y: -8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
    >
      <path d="M30 54V22" />
      <path d="M30 34c-6-2-10-7-10-14 7 0 12 4 14 10" fill="var(--sage)" stroke="var(--sage-deep)" />
      <path d="M30 40c6-2 10-7 10-14-7 0-12 4-14 10" fill="var(--sage)" stroke="var(--sage-deep)" />
      <circle cx="30" cy="16" r="8" fill="var(--rose-soft)" stroke="var(--rose-deep)" />
      <circle cx="30" cy="16" r="3" fill="var(--gold)" stroke="none" />
    </motion.svg>
  );
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="var(--rose-deep)"
      strokeWidth={1}
      strokeLinecap="round"
    >
      <path d="M4 60 C 4 28, 28 4, 60 4" opacity={0.35} />
      <path d="M16 60 C 16 36, 36 16, 60 16" opacity={0.22} />
      <circle cx="60" cy="4" r="3" fill="var(--gold)" stroke="none" opacity={0.5} />
      <circle cx="4" cy="60" r="3" fill="var(--rose)" stroke="none" opacity={0.5} />
    </svg>
  );
}

function Index() {
  const [bloom, setBloom] = useState(false);
  const [noTries, setNoTries] = useState(0);
  const [yes, setYes] = useState(false);
  const thanks = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!yes) return undefined;
    const t = setTimeout(
      () => thanks.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      400,
    );
    return () => clearTimeout(t);
  }, [yes]);


  return (
    <main className="relative overflow-x-hidden">
      <MusicToggle />
      <Petals count={bloom ? 14 : 7} />

      {/* Screen 1 */}
      <Screen>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--rose-soft) 78%, transparent) 0%, color-mix(in oklab, var(--gold) 22%, transparent) 50%, transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 8%, color-mix(in oklab, var(--rose-soft) 55%, transparent) 0%, transparent 70%)",
          }}
        />

        <CornerFlourish className="pointer-events-none absolute left-5 top-5 h-14 w-14 sm:left-10 sm:top-10 sm:h-20 sm:w-20" />
        <CornerFlourish className="pointer-events-none absolute right-5 top-5 h-14 w-14 -scale-x-100 sm:right-10 sm:top-10 sm:h-20 sm:w-20" />

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex flex-col items-center rounded-[2.5rem] border border-primary/10 bg-card/40 px-8 py-12 shadow-petal backdrop-blur-sm sm:px-14 sm:py-16"
        >
          <Sprig />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-primary/50" />
            a little something
            <span className="h-1 w-1 rounded-full bg-primary/50" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="mt-5 text-5xl leading-tight text-foreground sm:text-7xl"
          >
            Something for you,
            <span className="block bg-gradient-to-r from-primary via-[var(--rose)] to-primary bg-clip-text italic text-transparent">
              Arzoo
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 flex items-center gap-3 text-primary/40"
          >
            <span className="h-px w-10 bg-current" />
            <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
              <path d="M8 0c2.5 1.8 3.7 3.6 3.7 5.5C11.7 8.8 10 10.7 8 11.5 6 10.7 4.3 8.8 4.3 5.5 4.3 3.6 5.5 1.8 8 0z" />
            </svg>
            <span className="h-px w-10 bg-current" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-sm text-base text-muted-foreground sm:text-lg"
          >
            Just scroll, it'll only take a minute.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2 text-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">scroll</span>
          <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
          </svg>
        </motion.div>
      </Screen>

      {/* Screen 2 */}
      <Screen onEnter={() => setBloom(true)} className="py-16">
        <BouquetSVG play={bloom} />
      </Screen>

      {/* Screen 3 */}
      <Screen className="py-20">
        <p className="font-hand max-w-lg text-2xl leading-relaxed text-foreground sm:text-3xl">
          {NOTE}
        </p>

        <h2 className="mt-14 text-3xl italic text-foreground sm:text-4xl">
          Do you forgive me?
        </h2>

        <div className="mt-12 flex min-h-[9rem] w-full max-w-md items-center justify-center gap-6">
          <motion.button
            type="button"
            onClick={() => {
              setYes(true);
              void notifyResponse({ answer: "yes" });
            }}
            animate={{ scale: 1 + noTries * 0.16 }}
            whileTap={{ scale: 1 + noTries * 0.16 - 0.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="rounded-full bg-primary px-9 py-3 text-lg text-primary-foreground shadow-petal"
          >
            Yes
          </motion.button>
          <NoButton
            onAttempt={(n) => {
              setNoTries(n);
              void notifyResponse({ answer: "no", attempt: n });
            }}
          />
        </div>
      </Screen>

      <AnimatePresence>
        {yes && (
          <>
            <PetalBurst />
            <motion.div
              ref={thanks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.4 }}
                className="text-4xl italic text-primary sm:text-6xl"
              >
                Thank you, Arzoo
              </motion.h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
