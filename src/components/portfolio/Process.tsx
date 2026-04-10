import { Search, PenTool, Wrench, TestTube, Rocket, RefreshCw } from "lucide-react";
import { useReveal, reveal } from "@/hooks/useReveal";

const steps = [
  { icon: Search, title: "Discover", desc: "Understand the problem, data landscape, and business requirements through deep technical discovery." },
  { icon: PenTool, title: "Design", desc: "Architect the AI solution — selecting models, data pipelines, and integration points." },
  { icon: Wrench, title: "Build", desc: "Develop, train, and integrate AI components with robust engineering practices." },
  { icon: TestTube, title: "Evaluate", desc: "Rigorously test and benchmark against quality, performance, and safety criteria." },
  { icon: Rocket, title: "Deploy", desc: "Ship to production with monitoring, scaling, and failover strategies." },
  { icon: RefreshCw, title: "Optimize", desc: "Continuously improve based on real-world performance data and user feedback." },
];

export function Process() {
  const heading = useReveal();
  const grid = useReveal();

  return (
    <section id="process" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div ref={heading.ref} className={`text-center mb-12 ${reveal.heading(heading.visible)}`}>
          <p className="text-label uppercase text-primary mb-3 font-body">Methodology</p>
          <h2 className="text-section font-heading tracking-tight mb-4">
            How I Work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            A structured, outcome-driven approach to every AI engagement.
          </p>
        </div>

        <div ref={grid.ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => {
            const s = reveal.card(grid.visible, i * 80);
            return (
              <div key={title} className={`relative p-6 rounded-xl bg-card border border-border ${s.className}`} style={s.style}>
                <span className="absolute top-4 right-4 text-5xl font-heading font-bold text-border">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-card-title font-heading mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
