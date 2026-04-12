import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useReveal, reveal } from "@/hooks/useReveal";

const categories = ["All", "ML/AI", "Agents", "Full-Stack", "Security", "Mobile"];

export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  outcome: string;
  category: string;
  status: "Completed" | "Ongoing";
  github?: string | null;
  demo?: string | null;
  video?: string | null;
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const featuredProjects: Project[] = [
  {
    id: "epl-predictor",
    title: "EPL Match Predictor",
    summary: "End-to-end ML pipeline predicting Premier League match outcomes using CatBoost, with automated retraining, safety gates, and zero-cost deployment on Hugging Face Spaces.",
    stack: ["Python", "CatBoost", "FastAPI", "Supabase", "Docker", "GitHub Actions", "Hugging Face"],
    outcome: "62% precision, 58% F1, fully automated weekly retraining with safety gates",
    category: "ML/AI",
    status: "Completed",
    github: null,
    demo: "https://huggingface.co/spaces/shiphrahb/epl-match-predictor",
    video: null,
  },
  {
    id: "ai-coding-agent",
    title: "Python AI Coding Agent with Ollama",
    summary: "A local autonomous coding assistant that reads, refactors, tests, and generates Python code using DeepSeek-Coder 33B with agent-style orchestration and sandbox execution.",
    stack: ["Python", "Ollama", "DeepSeek-Coder 33B", "Git", "Sandbox Tooling"],
    outcome: "Privacy-preserving local AI agent with tool use, memory, and safety boundaries",
    category: "Agents",
    status: "Ongoing",
    github: null,
    demo: null,
    video: null,
  },
  {
    id: "api-key-agent",
    title: "API Key Exposure Detection Agent",
    summary: "AI-assisted security agent that scans public sources for exposed secrets, classifies findings with local LLMs, and generates redacted responsible disclosure reports.",
    stack: ["Python", "Ollama", "DuckDB", "Streamlit", "Regex/Entropy Scanning"],
    outcome: "Automated secret detection with AI triage and responsible disclosure workflows",
    category: "Security",
    status: "Ongoing",
    github: null,
    demo: null,
    video: null,
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
    github: null, demo: null, video: null,
  },
  {
    id: "rl-red-team",
    title: "RL-Powered AI Red Team Agent",
    summary: "Reinforcement learning agent trained on NASim to learn penetration testing policies in simulated network environments, with experiment tracking and reproducible benchmarks.",
    stack: ["Python", "Stable Baselines3", "PPO/SAC/DQN", "NASim", "W&B", "TensorBoard"],
    outcome: "Autonomous attack-policy learning in sandboxed simulated environments",
    category: "Security",
    status: "Ongoing",
    github: null, demo: null, video: null,
  },
  {
    id: "student-meetup",
    title: "Student Meet-Up Platform",
    summary: "Full-stack cloud platform for university students to publish, discover, and register for meet-ups, enriched with weather and location intelligence from external APIs.",
    stack: ["Java 21", "Spring Boot 3", "MongoDB Atlas", "Docker", "Bootstrap 5"],
    outcome: "Containerized service-oriented app with tested scalability and full documentation",
    category: "Full-Stack",
    status: "Completed",
    github: null, demo: null, video: null,
  },
  {
    id: "curlcare",
    title: "CurlCare – AI Hair Consultant App",
    summary: "Premium Android app combining service booking, educational content, journal tracking, and an AI hair advisor powered by Gemini, built with MVVM and Material Design 3.",
    stack: ["Java", "Android SDK", "MVVM", "Room DB", "Hilt", "Gemini AI"],
    outcome: "Production-ready mobile app with AI integration and polished UI/UX",
    category: "Mobile",
    status: "Completed",
    github: null, demo: null, video: null,
  },
];

function ProjectCard({ project, showCaseStudy = true, index = 0, visible = true }: { project: Project; showCaseStudy?: boolean; index?: number; visible?: boolean }) {
  const s = reveal.card(visible, index * 80);
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl p-7 transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.01] ${s.className}`}
      style={{
        ...s.style,
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px) saturate(150%)',
        WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0, 212, 200, 0.12)';
        e.currentTarget.style.borderColor = 'rgba(0, 212, 200, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
      }}
    >
      <span className="absolute top-4 left-0 w-[3px] h-[40px] bg-primary rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-[280ms]" />

      <div className="flex items-start justify-between mb-4">
        <span className="text-label uppercase text-primary tracking-wider bg-primary/10 px-2.5 py-1 rounded-md font-body">
          {project.category}
        </span>
        <span className={`text-label uppercase tracking-wider px-2.5 py-1 rounded-md font-body ${
          project.status === "Completed"
            ? "bg-teal-500/10 text-teal-400"
            : "bg-amber-500/10 text-amber-400"
        }`}>
          {project.status}
        </span>
      </div>

      <h3 className="text-card-title font-heading mb-3 text-foreground group-hover:text-primary transition-colors duration-[280ms]">
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
          <span key={tech} className="skill-badge-hover text-xs px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-muted-foreground font-body">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 sm:flex-row flex-col">
        {project.github !== undefined && (
          <a
            href={project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg bg-white/[0.04] border border-white/[0.12] text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200 font-body"
            onClick={!project.github ? (e) => e.preventDefault() : undefined}
          >
            <GitHubIcon />
            {project.github ? "View Code" : "GitHub — Link on Request"}
          </a>
        )}
        {project.demo !== undefined && (
          <a
            href={project.demo || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-body"
            onClick={!project.demo ? (e) => e.preventDefault() : undefined}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {project.demo ? "Live Demo" : "Demo — Link on Request"}
          </a>
        )}
        {project.video !== undefined && (
          <a
            href={project.video || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg bg-transparent border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 font-body"
            onClick={!project.video ? (e) => e.preventDefault() : undefined}
          >
            <Play className="w-3.5 h-3.5" />
            {project.video ? "Watch Demo" : "Video — Link on Request"}
          </a>
        )}
        {showCaseStudy && (
          <Button size="sm" variant="outline" asChild className="h-auto px-3.5 py-1.5 text-[0.8125rem]">
            <Link to={`/case-study/${project.id}`}>View Case Study</Link>
          </Button>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [active, setActive] = useState("All");
  const allProjects = [...featuredProjects, ...moreProjects];
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);
  const featuredFiltered = filtered.filter((p) => featuredProjects.some((fp) => fp.id === p.id));
  const moreFiltered = filtered.filter((p) => moreProjects.some((mp) => mp.id === p.id));

  const heading = useReveal();
  const featuredGrid = useReveal();
  const moreHeading = useReveal();
  const moreGrid = useReveal();

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div ref={heading.ref} className={`text-center mb-12 ${reveal.heading(heading.visible)}`}>
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

        {featuredFiltered.length > 0 && (
          <div ref={featuredGrid.ref} className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredFiltered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={featuredGrid.visible} />
            ))}
          </div>
        )}

        {moreFiltered.length > 0 && (
          <>
            <div ref={moreHeading.ref} className={`text-center mb-8 ${reveal.heading(moreHeading.visible)}`}>
              <h3 className="text-section font-heading tracking-tight text-foreground">
                Selected Work
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-body">Additional projects across full-stack, mobile, and security engineering.</p>
            </div>
            <div ref={moreGrid.ref} className="grid md:grid-cols-2 gap-6">
              {moreFiltered.map((project, i) => (
                <ProjectCard key={project.id} project={project} showCaseStudy={true} index={i} visible={moreGrid.visible} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
