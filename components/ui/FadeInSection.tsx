"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeInSection({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  // once: true — fires only the first time the element enters the viewport
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
