import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", updateMousePosition);

    const setupInteractiveElements = () => {
      const interactives = document.querySelectorAll('button, a, input, textarea, [role="button"]');
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
        // Clean up cursor inline style just in case
        el.style.cursor = "none";
      });
      document.body.style.cursor = "none";
    };

    setupInteractiveElements();
    
    // Mutation observer for dynamic content
    const observer = new MutationObserver(setupInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      observer.disconnect();
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      animate={{
        x: mousePosition.x - (isHovered ? 24 : 8),
        y: mousePosition.y - (isHovered ? 24 : 8),
        height: isHovered ? 48 : 16,
        width: isHovered ? 48 : 16,
        backgroundColor: isHovered ? "rgba(29, 185, 84, 0.15)" : "rgba(29, 185, 84, 0.8)",
        border: isHovered ? "1px solid rgba(29, 185, 84, 0.5)" : "none",
        backdropFilter: isHovered ? "blur(4px)" : "none",
      }}
      transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
    />
  );
}
