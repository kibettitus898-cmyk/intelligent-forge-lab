import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { useReveal, reveal } from "@/hooks/useReveal";

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
  const heading = useReveal();
  const badges = useReveal();
  const social = useReveal();

  return (
    <section id="certifications" className="section-padding">
      <div className="container-narrow">
        {/* Technologies */}
        <div className="mb-16">
          <div ref={heading.ref} className={`text-center mb-8 ${reveal.heading(heading.visible)}`}>
            <p className="text-label uppercase text-primary mb-3 font-body">Stack</p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Technologies I Work With
            </h2>
          </div>
          <div ref={badges.ref} className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech, i) => {
              const b = reveal.badge(badges.visible, i * 40);
              return (
                <span key={tech} className={`skill-badge-hover px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground border border-border font-body ${b.className}`} style={b.style}>
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Social Links */}
        <div ref={social.ref} className={reveal.heading(social.visible)}>
          <div className="text-center mb-6">
            <p className="text-label uppercase text-primary mb-6 font-body">Connect</p>
          </div>
          <div className="flex justify-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }, i) => {
              const s = reveal.scaleIn(social.visible, i * 100);
              return (
                <a
                  key={label}
                  href={href}
                  className={`icon-hover flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-primary/30 transition-all duration-200 text-sm font-body ${s.className}`}
                  style={s.style}
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
