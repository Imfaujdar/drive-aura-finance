import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
};

export default function FadeUp({ children, delay = 0, className, immediate = false }: Props) {
  const motionProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
