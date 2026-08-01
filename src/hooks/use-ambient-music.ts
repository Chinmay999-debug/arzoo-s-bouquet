import { useEffect, useRef, useState } from "react";

import { ambientMusic } from "@/lib/ambient-music";

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      ambientMusic.start();
      setPlaying(true);
    };

    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    window.addEventListener("wheel", start, { once: true, passive: true });
    window.addEventListener("touchstart", start, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("wheel", start);
      window.removeEventListener("touchstart", start);
    };
  }, []);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      ambientMusic.setMuted(next);
      return next;
    });
  };

  return { playing, muted, toggleMute };
}
