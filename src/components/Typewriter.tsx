import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  /** Start only when scrolled into view */
  whenVisible?: boolean;
};

export default function Typewriter({
  text,
  speed = 38,
  className = "",
  whenVisible = true,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState("");
  const [start, setStart] = useState(!whenVisible);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!whenVisible || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStart(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [whenVisible]);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    setShown("");
    setDone(false);
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [start, text, speed]);

  return (
    <span
      ref={ref}
      className={`${className} ${start && !done ? "type-caret" : ""}`}
    >
      {start ? shown : "\u00A0"}
    </span>
  );
}
