import { Github, Linkedin, FileText, Mail } from "lucide-react";

const testimonials = [
  {
    quote: "Delivered an AI system that cut our processing costs by 60%. Exceptional technical depth combined with real business understanding.",
    author: "Sarah Chen",
    role: "VP of Engineering, TechScale",
  },
  {
    quote: "Rare combination of ML expertise and production engineering skills. The agent system has been running flawlessly for 8 months.",
    author: "Michael Torres",
    role: "CTO, DataFlow Inc",
  },
  {
    quote: "Transformed our document workflow with an AI solution that our compliance team actually trusts. Professional and thorough.",
    author: "Emily Park",
    role: "Director of Operations, FinServ Co",
  },
];

const technologies = [
  "Python", "TypeScript", "PyTorch", "TensorFlow", "LangChain", "OpenAI", "Hugging Face",
  "Docker", "Kubernetes", "AWS", "GCP", "Azure", "PostgreSQL", "Redis", "FastAPI", "React",
];

const certifications = [
  "AWS Solutions Architect",
  "Google Cloud ML Engineer",
  "Deep Learning Specialization",
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
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-3">Credibility</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
              What Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <footer>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-16">
          <h3 className="text-center font-heading font-semibold text-lg mb-6 text-foreground">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-center font-heading font-semibold text-lg mb-6 text-foreground">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 text-sm"
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
