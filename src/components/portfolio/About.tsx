import { Bot, Brain, Cloud, Code, Lock, Rocket } from "lucide-react";

const capabilities = [
  { icon: Bot, label: "AI Agents & Workflow Automation" },
  { icon: Brain, label: "LLM Applications" },
  { icon: Code, label: "Model Training & Evaluation" },
  { icon: Rocket, label: "API Integrations" },
  { icon: Cloud, label: "Cloud Deployment" },
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
              Engineering AI that delivers business value
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm an AI engineer focused on turning complex business problems into production-ready AI systems. My work spans the full AI lifecycle — from prototyping and model training to agent orchestration and cloud deployment.
              </p>
              <p>
                I combine deep technical expertise in LLMs, machine learning, and software engineering with a clear understanding of business outcomes. Every system I build is designed for reliability, scalability, and measurable impact.
              </p>
              <p>
                Whether you need an autonomous agent handling multi-step workflows, a fine-tuned model for domain-specific predictions, or an AI-powered document processing pipeline — I architect and deliver solutions that work in production.
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
