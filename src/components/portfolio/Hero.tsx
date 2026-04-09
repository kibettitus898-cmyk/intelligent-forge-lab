import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  '{"model": "catboost-v3",',
  '  "precision": 0.62,',
  '  "f1_score": 0.58}',
  'def predict(features):',
  '    return model.predict(X)',
  'POST /api/v1/inference',
  'Authorization: Bearer ••••',
  '0x4a 0x9f 0xe2 0x17',
  'response.status: 200',
  '"agent_step": "observe"',
  'import torch',
  'scheduler.step()',
  'docker build -t ml-api .',
  'git push origin main',
  'SELECT * FROM fixtures',
  'ENV MODEL_PATH=/weights',
  'numpy==1.26.4',
  'action_space.sample()',
  'reward += shaped_r',
  'obs = env.reset()',
];

function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const nodes: { x: number; y: number; baseX: number; baseY: number; phase: number }[] = [];
    const COLS = 18;
    const ROWS = 12;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      nodes.length = 0;
      const spacingX = canvas.offsetWidth / (COLS - 1);
      const spacingY = canvas.offsetHeight / (ROWS - 1);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          nodes.push({
            x: c * spacingX,
            y: r * spacingY,
            baseX: c * spacingX,
            baseY: r * spacingY,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Update node positions with slow drift
      for (const node of nodes) {
        node.x = node.baseX + Math.sin(time + node.phase) * 6;
        node.y = node.baseY + Math.cos(time * 0.8 + node.phase) * 4;
      }

      // Draw connections
      ctx.strokeStyle = "rgba(0, 212, 200, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulsing
      for (const node of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.6 + node.phase);
        const radius = 1.2 + pulse * 0.8;
        const alpha = 0.06 + pulse * 0.04;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 200, ${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.08 }}
    />
  );
}

function CodeStream({ side }: { side: "left" | "right" }) {
  const lines = [...CODE_SNIPPETS, ...CODE_SNIPPETS];
  return (
    <div
      className={`absolute top-0 ${side === "left" ? "left-4 md:left-12" : "right-4 md:right-12"} h-full overflow-hidden pointer-events-none select-none`}
      style={{ width: 160, opacity: 0.04 }}
    >
      <div
        className="animate-code-scroll font-mono text-[10px] leading-5 text-foreground whitespace-pre"
        style={{ animationDuration: side === "left" ? "30s" : "36s" }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function GrainOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.035 }}>
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Network mesh canvas */}
      <NetworkMesh />

      {/* Code stream overlays */}
      <CodeStream side="left" />
      <CodeStream side="right" />

      {/* Grain texture */}
      <GrainOverlay />

      {/* Gradient orbs (kept subtle) */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)" }}
      />

      <div className="container-narrow relative z-10 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface-elevated text-label uppercase text-muted-foreground mb-8 animate-fade-in font-body">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for projects & consulting
        </div>

        <h1 className="text-hero font-heading tracking-tight leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-foreground">Titus Kibet</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-in font-body font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
          I build intelligent AI systems — from agents and automations to trained models and production deployments.
        </p>

        <p className="text-base text-steel max-w-2xl mx-auto mb-10 animate-fade-in font-body" style={{ animationDelay: "0.3s" }}>
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
