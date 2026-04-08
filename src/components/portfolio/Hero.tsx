import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-narrow relative z-10 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface-elevated text-sm text-muted-foreground mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for projects & consulting
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-foreground">Titus Kibet</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
          I build intelligent AI systems — from agents and automations to trained models and production deployments.
        </p>

        <p className="text-base text-steel max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          AI engineer building practical AI agents, local LLM systems, ML pipelines, and secure software for real-world business and research use cases.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button variant="hero" asChild>
            <a href="#projects">
              View Projects <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="hero-outline" asChild>
            <a href="#contact">Let's Work Together</a>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
