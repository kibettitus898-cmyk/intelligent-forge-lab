import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean `visible` that flips to true once the element
 * enters the viewport (IntersectionObserver, threshold 0.15).
 * The reveal is one-shot — once visible it stays visible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** CSS class strings for reveal animations */
export const reveal = {
  /** Section headings: translateY 24→0, opacity 0→1, 500ms */
  heading: (visible: boolean) =>
    `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,

  /** About text blocks: translateX -20→0, opacity 0→1, 500ms */
  slideRight: (visible: boolean) =>
    `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
    }`,

  /** Project cards: translateY 32→0, scale 0.97→1, opacity 0→1, 600ms */
  card: (visible: boolean, delayMs = 0) => ({
    className: `transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
      visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"
    }`,
    style: { transitionDelay: `${delayMs}ms` } as React.CSSProperties,
  }),

  /** Skill badges: translateX -12→0, opacity 0→1, stagger 40ms */
  badge: (visible: boolean, delayMs = 0) => ({
    className: `transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
    }`,
    style: { transitionDelay: `${delayMs}ms` } as React.CSSProperties,
  }),

  /** Certification / scale-in: scale 0.95→1, opacity 0→1, 450ms */
  scaleIn: (visible: boolean, delayMs = 0) => ({
    className: `transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
      visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`,
    style: { transitionDelay: `${delayMs}ms` } as React.CSSProperties,
  }),
};
