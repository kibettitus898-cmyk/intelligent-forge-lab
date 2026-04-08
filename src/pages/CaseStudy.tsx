import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";

const caseStudies: Record<string, {
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  stack: string[];
  highlights: string[];
  results: string[];
  lessons: string[];
}> = {
  "invoice-agent": {
    title: "AI Invoice Processing Agent",
    overview: "An autonomous AI agent that processes, validates, and reconciles invoices across multiple formats and vendors — replacing a manual, error-prone workflow.",
    challenge: "A mid-size logistics company was spending 40+ hours per week manually processing invoices from 200+ vendors. Error rates exceeded 8%, leading to payment delays and strained vendor relationships.",
    solution: "Built an agentic pipeline using GPT-4 for document understanding, with structured extraction, cross-referencing against PO databases, and automated exception handling with human escalation.",
    stack: ["GPT-4", "LangChain", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS Lambda"],
    highlights: [
      "Multi-format parsing (PDF, images, email attachments) with 99.2% extraction accuracy",
      "Intelligent routing — auto-approves standard invoices, flags exceptions for review",
      "Real-time dashboard for tracking processing status and audit trails",
      "Retry logic and graceful degradation for API failures",
    ],
    results: [
      "85% reduction in manual processing time",
      "Error rate dropped from 8% to 0.8%",
      "ROI achieved within 6 weeks of deployment",
      "Processing capacity scaled from 500 to 5,000 invoices/month",
    ],
    lessons: [
      "Hybrid AI + rule-based approaches outperform pure LLM solutions for structured data",
      "Human-in-the-loop checkpoints are essential for financial workflows",
      "Investing in robust error handling early saves significant debugging time",
    ],
  },
  "rag-assistant": {
    title: "Custom RAG Knowledge Assistant",
    overview: "A retrieval-augmented generation system enabling support teams to instantly find accurate answers from a large, unstructured knowledge base.",
    challenge: "Support teams were struggling to locate answers across 10,000+ internal documents stored in various formats and locations. Average resolution time was 45 minutes per ticket.",
    solution: "Designed a RAG pipeline with semantic chunking, hybrid search (dense + sparse), and a citation system that links every answer to its source document.",
    stack: ["OpenAI", "Pinecone", "LangChain", "Next.js", "AWS", "S3"],
    highlights: [
      "Semantic chunking with overlap for context preservation",
      "Hybrid retrieval combining vector similarity and keyword search",
      "Citation tracking — every answer includes source links",
      "Feedback loop for continuous retrieval quality improvement",
    ],
    results: [
      "60% faster ticket resolution times",
      "Adopted by 200+ team members within first month",
      "95% answer relevance rate based on user feedback",
      "Reduced escalations to senior staff by 40%",
    ],
    lessons: [
      "Chunking strategy is the single biggest factor in RAG quality",
      "Hybrid search consistently outperforms pure vector search",
      "User trust requires transparent source attribution",
    ],
  },
  "workflow-agent": {
    title: "Multi-Step Business Workflow Agent",
    overview: "A multi-agent system that orchestrates complex cross-department approval workflows with intelligent routing and human-in-the-loop checkpoints.",
    challenge: "A financial services firm's approval workflows required manual coordination across 5 departments, with frequent bottlenecks causing 2-week delays on critical decisions.",
    solution: "Implemented a CrewAI-based multi-agent system where specialized agents handle different workflow stages, with configurable escalation rules and real-time status tracking.",
    stack: ["CrewAI", "GPT-4", "Redis", "Docker", "GCP", "Cloud Run"],
    highlights: [
      "Role-specific agents for compliance, finance, legal, and operations",
      "Configurable approval thresholds and escalation paths",
      "Real-time Slack/email notifications at each stage",
      "Full audit trail with decision reasoning captured",
    ],
    results: [
      "3x faster workflow completion (14 days → 4.5 days average)",
      "Zero missed approvals since deployment",
      "98% on-time completion rate",
      "Saved 120+ hours/month in administrative overhead",
    ],
    lessons: [
      "Agent specialization yields better results than general-purpose agents",
      "Explicit handoff protocols between agents prevent dropped tasks",
      "Observability into agent reasoning is critical for compliance",
    ],
  },
  "prediction-model": {
    title: "Fine-Tuned Prediction Model",
    overview: "A custom transformer model fine-tuned on manufacturing sensor data for predictive quality control, detecting defects before they occur.",
    challenge: "Generic anomaly detection models were achieving only 72% accuracy on domain-specific manufacturing patterns, missing critical defects and generating excessive false positives.",
    solution: "Fine-tuned a transformer architecture on 18 months of labeled sensor data, implementing custom loss functions and domain-specific feature engineering.",
    stack: ["PyTorch", "Hugging Face", "MLflow", "Kubernetes", "Azure ML"],
    highlights: [
      "Custom data pipeline processing 50M+ sensor readings",
      "Domain-adapted tokenization for time-series data",
      "Ensemble approach combining transformer with gradient boosting",
      "Automated retraining pipeline triggered by drift detection",
    ],
    results: [
      "92% prediction accuracy (up from 72%)",
      "$2.1M annual savings in defect prevention",
      "False positive rate reduced by 65%",
      "Model inference latency under 50ms for real-time monitoring",
    ],
    lessons: [
      "Domain expertise in feature engineering matters more than model size",
      "Drift detection is essential for maintaining production accuracy",
      "Ensemble methods provide more robust predictions than single models",
    ],
  },
  "document-system": {
    title: "AI Secure Document Processing",
    overview: "An end-to-end encrypted document processing pipeline with AI-powered classification, entity extraction, and automated redaction for compliance.",
    challenge: "A regulated financial firm needed to process sensitive client documents while maintaining strict SOC 2 compliance. Manual review was consuming 60% of the compliance team's capacity.",
    solution: "Built a zero-trust document pipeline with client-side encryption, AI classification, PII detection and redaction, and comprehensive audit logging.",
    stack: ["Azure AI", "Python", "Terraform", "PostgreSQL", "Docker", "Azure Key Vault"],
    highlights: [
      "End-to-end encryption with customer-managed keys",
      "AI classification across 15 document types with 97% accuracy",
      "Automated PII detection and configurable redaction policies",
      "Immutable audit trail for all processing actions",
    ],
    results: [
      "SOC 2 Type II certification achieved",
      "70% reduction in manual review time",
      "Zero security incidents in 12 months of operation",
      "Processing throughput increased 5x",
    ],
    lessons: [
      "Security architecture must be designed upfront, not bolted on",
      "Configurable redaction policies are essential for different use cases",
      "Regular penetration testing builds genuine confidence in the system",
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
            {study.title}
          </h1>

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
