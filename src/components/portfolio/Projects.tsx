import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Agents", "LLM", "ML/AI", "Automation"];

const projects = [
  {
    id: "invoice-agent",
    title: "AI Invoice Processing Agent",
    problem: "Manual invoice processing consuming 40+ hours/week with frequent errors",
    stack: ["GPT-4", "LangChain", "Python", "FastAPI", "PostgreSQL"],
    built: "Autonomous agent that extracts, validates, and reconciles invoice data across formats",
    outcome: "85% reduction in processing time, 99.2% accuracy rate",
    category: "Agents",
  },
  {
    id: "rag-assistant",
    title: "Custom RAG Knowledge Assistant",
    problem: "Support teams unable to quickly access answers from 10K+ internal documents",
    stack: ["OpenAI", "Pinecone", "LangChain", "Next.js", "AWS"],
    built: "Retrieval-augmented generation system with semantic search and citation tracking",
    outcome: "60% faster resolution times, adopted by 200+ team members",
    category: "LLM",
  },
  {
    id: "workflow-agent",
    title: "Multi-Step Business Workflow Agent",
    problem: "Complex approval workflows requiring manual coordination across 5 departments",
    stack: ["CrewAI", "GPT-4", "Redis", "Docker", "GCP"],
    built: "Multi-agent system orchestrating cross-department workflows with human-in-the-loop checkpoints",
    outcome: "3x faster workflow completion, zero missed approvals",
    category: "Agents",
  },
  {
    id: "prediction-model",
    title: "Fine-Tuned Prediction Model",
    problem: "Generic models failing to capture domain-specific patterns in manufacturing data",
    stack: ["PyTorch", "Hugging Face", "MLflow", "Kubernetes", "Azure"],
    built: "Custom fine-tuned transformer model for predictive quality control",
    outcome: "92% prediction accuracy, $2.1M annual savings in defect prevention",
    category: "ML/AI",
  },
  {
    id: "document-system",
    title: "AI Secure Document Processing",
    problem: "Sensitive documents requiring manual review with strict compliance requirements",
    stack: ["Azure AI", "Python", "Terraform", "PostgreSQL", "Docker"],
    built: "End-to-end encrypted document processing pipeline with AI classification and redaction",
    outcome: "SOC 2 compliant, 70% reduction in manual review time",
    category: "Automation",
  },
];

export function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real-world AI systems built for production — each solving a specific business challenge with measurable results.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface-elevated text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                <span className="font-medium text-foreground">Problem:</span> {project.problem}
              </p>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                <span className="font-medium text-foreground">Built:</span> {project.built}
              </p>

              <p className="text-sm font-medium text-primary mb-4">
                ↗ {project.outcome}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/case-study/${project.id}`}>
                    View Case Study
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" /> Live Demo
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
