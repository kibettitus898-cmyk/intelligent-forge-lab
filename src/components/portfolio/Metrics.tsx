import { useEffect, useRef, useState } from "react";
import { useReveal, reveal } from "@/hooks/useReveal";

const metrics = [
  { value: 11, suffix: "+", label: "Years of Experience" },
  { value: 7, suffix: "", label: "Projects Built" },
  { value: 5, suffix: "", label: "Cloud Certifications" },
  { value: 2, suffix: "", label: "AI Agents Deployed" },
];

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOut cubic
      setCount(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, target, duration]);

  return count;
}

function MetricCard({ value, suffix, label, index, visible }: {
  value: number; suffix: string; label: string; index: number; visible: boolean;
}) {
  const count = useCountUp(value, 1800, visible);
  const s = reveal.card(visible, index * 80);

  return (
    <div
      className={`glass-card p-7 text-center ${s.className}`}
      style={s.style}
    >
      <p className="font-heading font-[800] text-[clamp(2.5rem,5vw,4rem)] leading-none text-primary">
        {count}{suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground font-body">{label}</p>
    </div>
  );
}

export function Metrics() {
  const section = useReveal();

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div
          ref={section.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} index={i} visible={section.visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
