import { Bot, Brain, Cloud, Code, Lock, Rocket, Smartphone, Shield } from "lucide-react";

const capabilities = [
  { icon: Bot, label: "AI Agents & Workflow Automation" },
  { icon: Brain, label: "LLM Applications & Local AI" },
  { icon: Code, label: "Model Training & Evaluation" },
  { icon: Rocket, label: "Backend & API Engineering" },
  { icon: Cloud, label: "Cloud Deployment & MLOps" },
  { icon: Shield, label: "Security Automation & Research" },
  { icon: Smartphone, label: "Mobile & Full-Stack Engineering" },
  { icon: Lock, label: "AI Prototyping for Startups & Businesses" },
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">About</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6">
              Engineering AI that solves real problems
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Titus Kibet — an AI engineer and systems builder with hands-on experience across AI agents, machine learning pipelines, full-stack product development, cloud deployment, and security-focused engineering.
              </p>
              <p>
                My work spans the full AI lifecycle: from data ingestion and model training to agent orchestration, API design, and production deployment. I build systems that are practical, reproducible, and designed for real-world use — not just demos.
              </p>
              <p>
                Whether it's a locally-hosted coding agent, a match prediction ML pipeline, a tenant management platform, or an RL-powered security research tool — I architect and deliver solutions grounded in solid engineering and clear thinking.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-6">What I Do</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface-elevated border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
