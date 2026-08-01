import { useEffect, useRef, useState } from "react";

export function Typewriter({
  text,
  speed = 34,
  start = true,
  className,
  onDone,
}: {
  text: string;
  speed?: number;
  start?: boolean;
  className?: string;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (count >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const char = text[count];
    const pause = char === "." || char === "," || char === "—" ? speed * 8 : speed;
    const t = setTimeout(() => setCount((c) => c + 1), pause);
    return () => clearTimeout(t);
  }, [count, start, text, speed, onDone]);

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {count < text.length && start ? (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-primary align-[-0.1em]" />
      ) : null}
    </p>
  );
}
