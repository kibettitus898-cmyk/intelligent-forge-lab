import { Github, Linkedin, FileText, Mail } from "lucide-react";

const technologies = [
  "Python", "Java", "TypeScript", "CatBoost", "PyTorch", "Stable Baselines3",
  "FastAPI", "Spring Boot", "Ollama", "DeepSeek-Coder", "Gemini AI",
  "Docker", "GitHub Actions", "Hugging Face", "Supabase", "MongoDB Atlas",
  "PostgreSQL", "SQLite", "DuckDB", "Streamlit", "Android SDK", "Material Design 3",
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: FileText, label: "Resume", href: "#" },
  { icon: Mail, label: "Email", href: "#contact" },
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        {/* Technologies */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-label uppercase text-primary mb-3 font-body">Stack</p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Technologies I Work With
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground border border-border font-body">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center mb-6">
          <p className="text-label uppercase text-primary mb-6 font-body">Connect</p>
        </div>
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 text-sm font-body">
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
