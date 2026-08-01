import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { Petals } from "@/components/Petals";
import { Typewriter } from "@/components/Typewriter";
import { ReasonCarousel } from "@/components/ReasonCarousel";
import { DodgeButton } from "@/components/DodgeButton";
import { Bouquet } from "@/components/Bouquet";
import { Coupons } from "@/components/Coupons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Bouquet for Arzoo — An Apology in Full Bloom" },
      {
        name: "description",
        content:
          "A hand-made apology for Arzoo: a note, a few light-hearted reasons, and a bouquet that blooms when you press forgive.",
      },
      { property: "og:title", content: "A Bouquet for Arzoo" },
      {
        property: "og:description",
        content: "An apology in full bloom — open it, read the note, and let the flowers do the rest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NOTE =
  "Arzoo — I've replayed it a hundred times, and every version ends with me being the one who should have known better. I'm sorry. Not the quick kind of sorry, the kind that sat with itself for a while. You deserve more care than I gave, and I'd like to spend a long time proving I've learned that.";

function Index() {
  const [opened, setOpened] = useState(false);
  const [forgiven, setForgiven] = useState(false);

  const open = () => {
    setOpened(true);
    requestAnimationFrame(() =>
      document.getElementById("note")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  const forgive = () => {
    setForgiven(true);
    setTimeout(
      () => document.getElementById("bouquet")?.scrollIntoView({ behavior: "smooth" }),
      120,
    );
  };

  return (
    <main className="relative overflow-x-hidden">
      <Petals />

      {/* Hero */}
      <section className="mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-hand text-2xl text-primary/70"
        >
          a small, sincere thing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-3 text-5xl leading-[1.05] text-foreground sm:text-7xl"
        >
          A Bouquet
          <span className="block italic text-primary">for Arzoo</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mx-auto mt-8 h-px w-24 bg-primary/40"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-md text-xl leading-relaxed text-muted-foreground text-balance-pretty"
        >
          I couldn't find flowers good enough, so I grew some here instead.
        </motion.p>

        <motion.button
          type="button"
          onClick={open}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full bg-primary px-10 py-4 text-xl tracking-wide text-primary-foreground shadow-petal"
        >
          Open it
        </motion.button>
      </section>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Note */}
            <section id="note" className="mx-auto max-w-2xl scroll-mt-16 px-6 py-24">
              <h2 className="font-hand text-3xl text-primary">Dear Arzoo,</h2>
              <Typewriter
                text={NOTE}
                start={opened}
                className="mt-5 min-h-[16rem] text-xl leading-relaxed text-foreground text-balance-pretty sm:text-2xl sm:leading-relaxed"
              />
              <p className="mt-6 font-hand text-2xl text-primary">— me, sincerely</p>
            </section>

            {/* Reasons */}
            <section className="py-10">
              <div className="mx-auto max-w-3xl px-6 text-center">
                <h2 className="text-4xl italic text-foreground sm:text-5xl">
                  Why I'm worth forgiving
                </h2>
                <p className="mt-3 font-hand text-2xl text-primary/70">
                  swipe — the evidence is compelling
                </p>
              </div>
              <div className="mt-10">
                <ReasonCarousel />
              </div>
            </section>

            {/* Verdict */}
            <section className="mx-auto max-w-2xl px-6 py-24 text-center">
              <h2 className="text-4xl text-foreground sm:text-5xl">The verdict?</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Only one of these buttons wants to be pressed.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={forgive}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full bg-primary px-10 py-4 text-xl text-primary-foreground shadow-petal"
                >
                  I forgive you
                </motion.button>
                <DodgeButton />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {forgiven && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Bouquet */}
            <section id="bouquet" className="scroll-mt-10 px-6 py-20">
              <div className="mx-auto max-w-2xl text-center">
                <p className="font-hand text-3xl text-primary">then these are yours</p>
                <h2 className="mt-2 text-4xl italic text-foreground sm:text-5xl">
                  Grown entirely by hand
                </h2>
              </div>
              <div className="mt-12">
                <Bouquet
                  play={forgiven}
                  message="Thank you for being kinder to me than I was to you. I love you, Arzoo."
                />
              </div>
            </section>

            {/* Coupons */}
            <section className="mx-auto max-w-5xl px-6 pb-28">
              <div className="text-center">
                <h2 className="text-4xl italic text-foreground sm:text-5xl">
                  And a few redeemables
                </h2>
                <p className="mt-3 font-hand text-2xl text-primary/70">
                  no fine print, no expiry (mostly)
                </p>
              </div>
              <div className="mt-10">
                <Coupons />
              </div>
              <p className="mt-16 text-center font-hand text-2xl text-primary">
                made with far too much care, for Arzoo
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
