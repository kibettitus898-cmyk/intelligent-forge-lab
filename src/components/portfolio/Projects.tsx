import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "ML/AI", "Agents", "Full-Stack", "Security", "Mobile"];

export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  outcome: string;
  category: string;
  status: "Completed" | "Ongoing";
}

const featuredProjects: Project[] = [
  {
    id: "epl-predictor",
    title: "EPL Match Predictor",
    summary: "End-to-end ML pipeline predicting Premier League match outcomes using CatBoost, with automated retraining, safety gates, and zero-cost deployment on Hugging Face Spaces.",
    stack: ["Python", "CatBoost", "FastAPI", "Supabase", "Docker", "GitHub Actions", "Hugging Face"],
    outcome: "62% precision, 58% F1, fully automated weekly retraining with safety gates",
    category: "ML/AI",
    status: "Completed",
  },
  {
    id: "ai-coding-agent",
    title: "Python AI Coding Agent with Ollama",
    summary: "A local autonomous coding assistant that reads, refactors, tests, and generates Python code using DeepSeek-Coder 33B with agent-style orchestration and sandbox execution.",
    stack: ["Python", "Ollama", "DeepSeek-Coder 33B", "Git", "Sandbox Tooling"],
    outcome: "Privacy-preserving local AI agent with tool use, memory, and safety boundaries",
    category: "Agents",
    status: "Ongoing",
  },
  {
    id: "api-key-agent",
    title: "API Key Exposure Detection Agent",
    summary: "AI-assisted security agent that scans public sources for exposed secrets, classifies findings with local LLMs, and generates redacted responsible disclosure reports.",
    stack: ["Python", "Ollama", "DuckDB", "Streamlit", "Regex/Entropy Scanning"],
    outcome: "Automated secret detection with AI triage and responsible disclosure workflows",
    category: "Security",
    status: "Ongoing",
  },
];

const moreProjects: Project[] = [
  {
    id: "tenantflow",
    title: "TenantFlow – Tenant & Receipt Management",
    summary: "A tenant management web app for landlords to manage tenants, payments, and digital receipts with a RESTful API backend and planned WhatsApp integration.",
    stack: ["HTML", "JavaScript", "FastAPI", "SQLAlchemy", "PostgreSQL"],
    outcome: "Auditable relational schema ready for low-cost deployment and AI extensions",
    category: "Full-Stack",
    status: "Ongoing",
  },
  {
    id: "rl-red-team",
    title: "RL-Powered AI Red Team Agent",
    summary: "Reinforcement learning agent trained on NASim to learn penetration testing policies in simulated network environments, with experiment tracking and reproducible benchmarks.",
    stack: ["Python", "Stable Baselines3", "PPO/SAC/DQN", "NASim", "W&B", "TensorBoard"],
    outcome: "Autonomous attack-policy learning in sandboxed simulated environments",
    category: "Security",
    status: "Ongoing",
  },
  {
    id: "student-meetup",
    title: "Student Meet-Up Platform",
    summary: "Full-stack cloud platform for university students to publish, discover, and register for meet-ups, enriched with weather and location intelligence from external APIs.",
    stack: ["Java 21", "Spring Boot 3", "MongoDB Atlas", "Docker", "Bootstrap 5"],
    outcome: "Containerized service-oriented app with tested scalability and full documentation",
    category: "Full-Stack",
    status: "Completed",
  },
  {
    id: "curlcare",
    title: "CurlCare – AI Hair Consultant App",
    summary: "Premium Android app combining service booking, educational content, journal tracking, and an AI hair advisor powered by Gemini, built with MVVM and Material Design 3.",
    stack: ["Java", "Android SDK", "MVVM", "Room DB", "Hilt", "Gemini AI"],
    outcome: "Production-ready mobile app with AI integration and polished UI/UX",
    category: "Mobile",
    status: "Completed",
  },
];

function ProjectCard({ project, showCaseStudy = true }: { project: Project; showCaseStudy?: boolean }) {
  return (
    <article className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
           <span className="text-label uppercase text-primary tracking-wider bg-primary/10 px-2.5 py-1 rounded-md font-body">
            {project.category}
          </span>
          <span className={`text-label uppercase tracking-wider px-2.5 py-1 rounded-md font-body ${
            project.status === "Completed"
              ? "bg-green-500/10 text-green-500"
              : "bg-amber-500/10 text-amber-500"
          }`}>
            {project.status}
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <h3 className="text-card-title font-heading mb-3 text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-body">
        {project.summary}
      </p>

      <p className="text-sm font-medium text-primary mb-4 font-body">
        ↗ {project.outcome}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-body">
            {tech}
          </span>
        ))}
      </div>

      {showCaseStudy && (
        <Button size="sm" variant="outline" asChild>
          <Link to={`/case-study/${project.id}`}>View Case Study</Link>
        </Button>
      )}
    </article>
  );
}

export function Projects() {
  const [active, setActive] = useState("All");
  const allProjects = [...featuredProjects, ...moreProjects];
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);
  const featuredFiltered = filtered.filter((p) => featuredProjects.some((fp) => fp.id === p.id));
  const moreFiltered = filtered.filter((p) => moreProjects.some((mp) => mp.id === p.id));

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="text-label uppercase text-primary mb-3 font-body">Portfolio</p>
          <h2 className="text-section font-heading tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Real AI systems and engineering projects — each solving a specific challenge with practical, production-oriented thinking.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-body ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface-elevated text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featuredFiltered.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredFiltered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Selected Work */}
        {moreFiltered.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-section font-heading tracking-tight text-foreground">
                Selected Work
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-body">Additional projects across full-stack, mobile, and security engineering.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {moreFiltered.map((project) => (
                <ProjectCard key={project.id} project={project} showCaseStudy={true} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
