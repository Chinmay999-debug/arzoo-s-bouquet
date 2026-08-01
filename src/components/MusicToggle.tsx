import { motion, AnimatePresence } from "motion/react";

import { useAmbientMusic } from "@/hooks/use-ambient-music";

export function MusicToggle() {
  const { playing, muted, toggleMute } = useAmbientMusic();
  const silent = muted || !playing;

  return (
    <motion.button
      type="button"
      onClick={toggleMute}
      aria-label={silent ? "Turn music on" : "Mute music"}
      aria-pressed={!silent}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-card/70 text-primary shadow-petal backdrop-blur-sm transition-colors hover:bg-card/90 sm:bottom-6 sm:right-6"
    >
      {!silent && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/25"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {silent ? (
          <motion.svg
            key="off"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            aria-hidden
            viewBox="0 0 24 24"
            className="relative h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 9v6h4l5 4V5l-5 4H9z" />
            <path d="M19 9l4 6M23 9l-4 6" />
          </motion.svg>
        ) : (
          <motion.svg
            key="on"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            aria-hidden
            viewBox="0 0 24 24"
            className="relative h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 9v6h4l5 4V5l-5 4H9z" />
            <path d="M18.5 8.5a5 5 0 0 1 0 7" />
            <path d="M20.5 6.5a8 8 0 0 1 0 11" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
