const skillCategories = [
  {
    title: "AI Engineering",
    skills: ["LLMs (GPT-4, Claude, Llama)", "Prompt Engineering", "RAG Systems", "Embeddings & Vector DBs", "AI Application Architecture"],
  },
  {
    title: "Agentic Workflows",
    skills: ["LangChain / LangGraph", "CrewAI", "AutoGen", "Multi-Agent Orchestration", "Human-in-the-Loop Systems"],
  },
  {
    title: "Model Training & Evaluation",
    skills: ["PyTorch / TensorFlow", "Hugging Face Transformers", "Fine-Tuning & RLHF", "Model Evaluation & Benchmarking", "Data Pipeline Design"],
  },
  {
    title: "MLOps / Deployment",
    skills: ["MLflow / Weights & Biases", "Model Serving (TorchServe, vLLM)", "CI/CD for ML", "Monitoring & Observability", "A/B Testing"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS / GCP / Azure", "Docker & Kubernetes", "Terraform", "Serverless (Lambda, Cloud Functions)", "PostgreSQL / Redis"],
  },
  {
    title: "Security & DevOps",
    skills: ["SOC 2 Compliance", "Data Encryption & PII Handling", "API Security", "Infrastructure as Code", "Secrets Management"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            Skills & Capabilities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="font-heading font-semibold text-foreground mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
