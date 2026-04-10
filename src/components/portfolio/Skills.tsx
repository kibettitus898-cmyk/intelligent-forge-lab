const skillCategories = [
  {
    title: "AI Agents & LLM Systems",
    skills: ["Ollama / DeepSeek-Coder", "Agent Loop Architecture", "Tool Use & Memory", "Prompt Engineering", "Local LLM Workflows"],
  },
  {
    title: "Machine Learning & MLOps",
    skills: ["CatBoost / Scikit-learn", "PyTorch / Hugging Face", "Feature Engineering", "MLflow / W&B", "Automated Retraining Pipelines"],
  },
  {
    title: "Backend & APIs",
    skills: ["FastAPI / Python", "Spring Boot / Java", "SQLAlchemy / Room DB", "PostgreSQL / MongoDB / SQLite", "RESTful API Design"],
  },
  {
    title: "Security Automation & Research",
    skills: ["Exposed Secret Detection", "Regex & Entropy Scanning", "Reinforcement Learning (PPO/SAC/DQN)", "NASim / Sandboxed Environments", "Responsible Disclosure Workflows"],
  },
  {
    title: "Mobile & Full-Stack Engineering",
    skills: ["Android SDK / Java", "MVVM / Hilt / Room", "Material Design 3", "Gemini AI Integration", "HTML / JavaScript / Bootstrap"],
  },
  {
    title: "Cloud, DevOps & Deployment",
    skills: ["Docker / docker-compose", "GitHub Actions CI/CD", "Hugging Face Spaces", "Supabase / MongoDB Atlas", "Google Colab / Cloud Environments"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="text-label uppercase text-primary mb-3 font-body">Expertise</p>
          <h2 className="text-section font-heading tracking-tight mb-4">
            Skills & Capabilities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <h3 className="text-card-title font-heading mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="skill-badge-hover text-sm text-muted-foreground flex items-center gap-2 font-body px-2 py-0.5 rounded-md border border-transparent">
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
