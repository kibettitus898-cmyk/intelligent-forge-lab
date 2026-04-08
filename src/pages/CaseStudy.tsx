import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";

const caseStudies: Record<string, {
  title: string;
  status: string;
  overview: string;
  challenge: string;
  solution: string;
  stack: string[];
  highlights: string[];
  results: string[];
  lessons: string[];
}> = {
  "epl-predictor": {
    title: "EPL Match Predictor",
    status: "Completed",
    overview: "A complete machine learning pipeline that predicts English Premier League match outcomes (Home / Draw / Away) using three seasons of API-Football data, deployed as a production-ready service with automated retraining.",
    challenge: "Predicting football match outcomes is notoriously difficult due to noisy data, class imbalance, and the risk of data leakage from future-aware features. The goal was to build a robust, reproducible ML system — not just a notebook experiment.",
    solution: "Built an end-to-end pipeline covering raw data ingestion, leakage-safe feature engineering, CatBoost model training, FastAPI inference serving, Docker containerization, and Hugging Face Spaces deployment with weekly automated retraining via GitHub Actions.",
    stack: ["Python", "CatBoost", "Google Colab", "Supabase", "FastAPI", "Docker", "GitHub Actions", "Hugging Face Spaces"],
    highlights: [
      "Fetched 380+ EPL fixtures via API-Football with data quality checks for duplicates and null teams",
      "Engineered 15 leakage-safe features including rolling stats, streaks, h2h rates, venue and time features",
      "Used shift(1) and closed='left' rolling windows to strictly prevent data leakage",
      "Persisted team encoders for consistent inference across retraining cycles",
      "Productionized with Docker, FastAPI, Hugging Face Spaces, and GitHub Actions CI/CD",
      "Implemented safety gates for precision, F1, and Brier score before model promotion",
    ],
    results: [
      "CatBoost multiclass model with 62% precision and 58% F1",
      "Zero-cost infrastructure using free-tier tools (Colab, Supabase, HF Spaces)",
      "Weekly automated retraining with safety gates",
      "Full MLOps pipeline: data → train → evaluate → deploy → monitor",
    ],
    lessons: [
      "Leakage-safe feature engineering is the single most important step in sports prediction ML",
      "Shift-based rolling windows and strict temporal splits prevent overoptimistic validation scores",
      "Safety gates on retraining prevent model regressions from being auto-promoted to production",
      "Free-tier tooling can support production-grade ML when architected carefully",
    ],
  },
  "ai-coding-agent": {
    title: "Python AI Coding Agent with Ollama",
    status: "Ongoing",
    overview: "An autonomous local AI coding assistant that reads, refactors, tests, and generates Python code using Ollama and DeepSeek-Coder 33B, running entirely on local hardware for privacy-preserving workflows.",
    challenge: "Cloud-based AI coding tools send proprietary code to external servers. For sensitive codebases, a fully local alternative is needed — one that can understand context, propose safe changes, and validate output without external API calls.",
    solution: "Building an agent-style orchestration system where the AI follows a structured loop: receive task → inspect files → propose changes → generate diffs → validate output in a sandbox — all running locally via Ollama.",
    stack: ["Python", "Ollama", "DeepSeek-Coder 33B", "Local Ubuntu", "Git Tooling", "Sandbox Execution"],
    highlights: [
      "Agent loop architecture: task → inspect → propose → diff → validate",
      "Reads and understands existing Python codebases for context-aware generation",
      "Generates functions, classes, and scripts with type hints and docstrings",
      "Sandbox execution for safe code validation before committing changes",
      "Reusable agent skeleton designed for extensibility with additional tools",
    ],
    results: [
      "Fully local, privacy-preserving coding workflow",
      "Reusable agent architecture extendable with custom tools",
      "Demonstrates local LLM integration, tool use, memory, and safety boundaries",
    ],
    lessons: [
      "Local LLMs require careful prompt engineering due to smaller context windows",
      "Agent-style orchestration adds reliability over single-shot code generation",
      "Sandbox execution is essential for safe automated code changes",
    ],
  },
  "api-key-agent": {
    title: "API Key Exposure Detection & Responsible Disclosure Agent",
    status: "Ongoing",
    overview: "An AI-assisted security agent that scans public sources for exposed API keys and secrets, classifies findings using pattern matching and local LLMs, and generates redacted reports for ethical responsible disclosure.",
    challenge: "API key leaks in public repositories are a widespread security problem. Manual scanning is slow, and many automated tools produce excessive false positives. An intelligent triage layer is needed.",
    solution: "Building a detection pipeline combining regex/entropy-based scanning with AI-assisted classification via Ollama, DuckDB for findings storage, Streamlit for dashboard visualization, and PDF reporting for responsible disclosure workflows.",
    stack: ["Python", "Regex/Entropy Scanning", "Ollama", "DuckDB", "Streamlit", "PDF Reporting"],
    highlights: [
      "Pattern matching and entropy analysis for likely real key detection",
      "AI-assisted classification to reduce false positives",
      "Professional redacted report generation for responsible disclosure",
      "Lightweight dashboard for tracking disclosure status",
      "Strictly passive, public-source scanning — ethical by design",
    ],
    results: [
      "Proactive exposed-secret detection from public sources",
      "AI-driven triage reducing manual review burden",
      "Reusable open-source security automation pattern",
    ],
    lessons: [
      "Combining regex with entropy analysis significantly reduces false positives",
      "Responsible disclosure requires careful redaction and professional communication",
      "Ethical framing and transparency are essential in security tooling",
    ],
  },
  "tenantflow": {
    title: "TenantFlow – Tenant & Receipt Management System",
    status: "Ongoing",
    overview: "A tenant management web application for landlords to manage tenants, monthly payments, and digital receipts, with a RESTful backend and architecture ready for AI extensions.",
    challenge: "Small landlords often manage tenants, payments, and receipts manually using spreadsheets or paper — leading to missed payments, lost records, and no audit trail.",
    solution: "Building a modern web app with a FastAPI backend and relational schema covering landlords, properties, units, tenants, charges, payments, and receipts — designed for low-cost self-hosting with planned WhatsApp receipt delivery.",
    stack: ["HTML", "JavaScript", "FastAPI", "SQLAlchemy", "SQLite / PostgreSQL"],
    highlights: [
      "Auditable relational schema for the full landlord-tenant lifecycle",
      "RESTful API with clean endpoint design",
      "Digital receipt generation and payment history tracking",
      "Architecture ready for WhatsApp integration and AI-powered reminders",
      "Designed for low-cost deployment on free-tier infrastructure",
    ],
    results: [
      "Working prototype with tenant profiles, payment tracking, and receipt generation",
      "Extensible architecture ready for AI features like tenant risk scoring",
    ],
    lessons: [
      "Real-world workflow modeling requires deep understanding of the domain",
      "Starting with a clean schema makes future AI extensions much easier",
      "Low-cost deployment targets force good architectural discipline",
    ],
  },
  "rl-red-team": {
    title: "RL-Powered AI Red Team Agent",
    status: "Ongoing",
    overview: "A research-grade reinforcement learning agent trained to perform penetration testing tasks in simulated network environments, strictly confined to sandboxed lab environments for ethical research.",
    challenge: "Traditional penetration testing is manual, time-consuming, and depends on expert knowledge. Reinforcement learning offers the potential for autonomous policy learning — but only if done ethically in controlled environments.",
    solution: "Training RL agents (PPO, SAC, DQN) on NASim simulated networks, with shaped rewards, experiment tracking via W&B and TensorBoard, and reproducible benchmarks against random and rule-based baselines.",
    stack: ["Python", "Stable Baselines3", "PPO / SAC / DQN", "NASim", "Weights & Biases", "TensorBoard", "Plotly", "LaTeX"],
    highlights: [
      "Pentest-like observation and action spaces defined for RL training",
      "Shaped reward functions for meaningful attack-policy learning",
      "Multi-scenario evaluation for generalization testing",
      "Full experiment tracking with reproducible benchmarks",
      "Technical paper documenting methodology and findings",
      "All work strictly confined to sandboxed simulated environments",
    ],
    results: [
      "Autonomous attack-policy learning in simulated networks",
      "Reproducible benchmarks against random and rule-based baselines",
      "Technical paper and open-source research artifact in progress",
    ],
    lessons: [
      "Reward shaping is critical for meaningful RL policy learning in security domains",
      "Ethical boundaries must be designed into the system from day one",
      "Simulated environments enable rigorous research without real-world risk",
    ],
  },
  "student-meetup": {
    title: "Student Meet-Up Platform",
    status: "Completed",
    overview: "A full-stack cloud-hosted platform for university students to publish, discover, and register for meet-ups, enriched with weather and location intelligence from external APIs.",
    challenge: "University students lacked a centralized platform to organize and discover campus events, with no integration of practical information like weather conditions or nearby points of interest.",
    solution: "Built a Spring Boot REST API with MongoDB persistence, Bootstrap frontend, and integrations with OpenWeatherMap, Skiddle, and GeoNames APIs — all containerized with Docker and performance-tested with JMeter.",
    stack: ["Java 21", "Spring Boot 3", "MongoDB Atlas", "Docker", "docker-compose", "Bootstrap 5", "Postman", "Apache JMeter"],
    highlights: [
      "RESTful API with event CRUD, registration, and ratings",
      "External API integration for weather, events, and geolocation",
      "Dockerized multi-container environment",
      "QoS performance testing with JMeter under concurrent load",
      "Handled API authentication, rate limiting, and geocoding edge cases",
    ],
    results: [
      "Fully working containerized service-oriented application",
      "Tested scalability under concurrent load",
      "Complete technical documentation",
    ],
    lessons: [
      "External API integration requires robust error handling and rate limit management",
      "Docker simplifies deployment but adds complexity to local development debugging",
      "Performance testing early reveals bottlenecks before they reach production",
    ],
  },
  "curlcare": {
    title: "CurlCare – AI Hair Consultant App",
    status: "Completed",
    overview: "A premium Android app for the natural hair community combining service booking, educational content, journal tracking, and an AI hair consultant called Crown — powered by Gemini AI.",
    challenge: "The natural hair community lacked a dedicated mobile platform that combined practical tools (booking, tracking) with intelligent guidance — most apps were either too generic or lacked AI-powered personalization.",
    solution: "Built a production-ready Android app with MVVM architecture, Hilt dependency injection, Room persistence, Material Design 3 UI, and Gemini AI integration for the Crown hair advisor feature.",
    stack: ["Java", "Android SDK", "MVVM", "Room Database", "Hilt", "Material Design 3", "RxJava", "Gemini AI SDK"],
    highlights: [
      "AI hair advisor (Crown) powered by Gemini for personalized recommendations",
      "Intelligent booking engine for hair services",
      "Educational content hub with categorized articles",
      "Journal tracking for hair care routines",
      "Production-ready MVVM architecture with dependency injection",
      "Polished Material Design 3 interface",
    ],
    results: [
      "Production-ready app with complete feature delivery",
      "Successful Gemini AI integration for intelligent recommendations",
      "Multi-module architecture demonstrating senior-level Android engineering",
    ],
    lessons: [
      "AI integration in mobile apps requires careful UX design for response latency",
      "MVVM with Hilt provides clean separation and testability",
      "Material Design 3 theming enables rapid UI iteration with consistent quality",
    ],
  },
};

export default function CaseStudy() {
  const { id } = useParams();
  const study = id ? caseStudies[id] : null;

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Case Study Not Found</h1>
          <Button variant="outline" asChild>
            <Link to="/">← Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-10">
      <h3 className="text-lg font-heading font-semibold text-primary mb-3">{title}</h3>
      {children}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-narrow">
          <Button variant="ghost" asChild className="mb-8 text-muted-foreground">
            <Link to="/#projects"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects</Link>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
              {study.title}
            </h1>
            <span className={`text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-md shrink-0 ${
              study.status === "Completed"
                ? "bg-green-500/10 text-green-500"
                : "bg-amber-500/10 text-amber-500"
            }`}>
              {study.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {study.stack.map((tech) => (
              <span key={tech} className="px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground border border-border">
                {tech}
              </span>
            ))}
          </div>

          <Section title="Overview">
            <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
          </Section>

          <Section title="Challenge">
            <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
          </Section>

          <Section title="Solution">
            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
          </Section>

          <Section title="Implementation Highlights">
            <ul className="space-y-2">
              {study.highlights.map((h) => (
                <li key={h} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Results">
            <div className="grid sm:grid-cols-2 gap-4">
              {study.results.map((r) => (
                <div key={r} className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm font-medium text-foreground">
                  ↗ {r}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Lessons Learned">
            <ul className="space-y-2">
              {study.lessons.map((l) => (
                <li key={l} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-steel mt-1.5 shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </Section>

          <div className="pt-6 border-t border-border">
            <Button variant="hero" asChild>
              <Link to="/#contact">Discuss a Similar Project</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
