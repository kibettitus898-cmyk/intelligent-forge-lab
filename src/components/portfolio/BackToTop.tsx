import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed right-4 sm:right-6 z-[201] w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl"
      style={{
        // Sit above mobile bottom nav (~64px tall + safe-area) on small screens, lower on desktop
        bottom: "calc(80px + env(safe-area-inset-bottom))",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
