import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Petals } from "@/components/Petals";
import { BouquetSVG } from "@/components/BouquetSVG";
import { PetalBurst } from "@/components/PetalBurst";
import { NoButton } from "@/components/NoButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Bouquet for Arzoo — Something for You" },
      {
        name: "description",
        content:
          "Three quiet screens for Arzoo: a note, a bouquet that blooms as you watch, and one question worth answering.",
      },
      { property: "og:title", content: "A Bouquet for Arzoo" },
      {
        property: "og:description",
        content: "A bouquet that blooms as you watch, and one question worth answering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NOTE =
  "I've thought about it a lot, and I know I got it wrong. I'm sorry, Arzoo — properly sorry. You were kind and I wasn't careful with it. I'd like to do better, starting now.";

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
      viewport={{ amount: 0.4 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      onViewportEnter={onEnter}
    >
      {children}
    </motion.section>
  );
}

function Index() {
  const [bloom, setBloom] = useState(false);
  const [noTries, setNoTries] = useState(0);
  const [yes, setYes] = useState(false);
  const thanks = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (yes) {
      const t = setTimeout(
        () => thanks.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        400,
      );
      return () => clearTimeout(t);
    }
  }, [yes]);

  return (
    <main className="relative overflow-x-hidden">
      {bloom && <Petals />}

      {/* Screen 1 */}
      <Screen>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="text-4xl leading-tight text-foreground sm:text-6xl"
        >
          Something for you,
          <span className="block italic text-primary">Arzoo</span>
        </motion.h1>

        <motion.svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute bottom-14 h-8 w-8 text-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        >
          <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
        </motion.svg>
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
            onClick={() => setYes(true)}
            animate={{ scale: 1 + noTries * 0.16 }}
            whileTap={{ scale: 1 + noTries * 0.16 - 0.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="rounded-full bg-primary px-9 py-3 text-lg text-primary-foreground shadow-petal"
          >
            Yes
          </motion.button>
          <NoButton onAttempt={setNoTries} />
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
