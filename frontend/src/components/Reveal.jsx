import React from 'react';
import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, duration = 0.6, className = "", direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, ...directions[direction] },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const TextReveal = ({ children, delay = 0, className = "" }) => {
  if (typeof children !== "string") return <Reveal delay={delay} className={className}>{children}</Reveal>;
  
  const words = children.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-wrap ${className}`}
      style={{ willChange: "opacity" }}
    >
      {words.map((word, idx) => (
        <motion.span variants={child} key={idx} className="mr-2 mb-1" style={{ willChange: "transform, opacity" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
