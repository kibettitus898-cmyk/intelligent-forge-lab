import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Mail, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { useReveal, reveal } from "@/hooks/useReveal";

const projectTypes = ["AI Agent", "ML Model", "Full-Stack App", "Security Automation", "Other"];

interface ContactChannel {
  label: string;
  cta: string;
  href: string;
  display: string;
  icon: React.ReactNode;
  brandColor?: string;
  external?: boolean;
}

const MailIcon = () => <Mail className="w-5 h-5" aria-hidden="true" />;
const ResumeIcon = () => <FileText className="w-5 h-5" aria-hidden="true" />;

const BrandImg = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    width={20}
    height={20}
    loading="lazy"
    decoding="async"
    className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
  />
);

const channels: ContactChannel[] = [
  {
    label: "Email",
    cta: "Send an Email",
    href: "mailto:tituskibet@email.com",
    display: "tituskibet@email.com",
    icon: <MailIcon />,
  },
  {
    label: "LinkedIn",
    cta: "Connect on LinkedIn",
    href: "https://linkedin.com/in/tituskibet",
    display: "linkedin.com/in/tituskibet",
    icon: <BrandImg src="https://cdn.simpleicons.org/linkedin/0A66C2" alt="LinkedIn" />,
    external: true,
  },
  {
    label: "WhatsApp",
    cta: "Message on WhatsApp",
    href: "https://wa.me/254XXXXXXXXX",
    display: "wa.me/254XXXXXXXXX",
    icon: <BrandImg src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" />,
    external: true,
  },
  {
    label: "GitHub",
    cta: "View Repositories",
    href: "https://github.com/shiphrahblessing2-byte",
    display: "github.com/shiphrahblessing2-byte",
    icon: <BrandImg src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" />,
    external: true,
  },
  {
    label: "Resume / CV",
    cta: "Download CV",
    href: "#contact",
    display: "Available on Request",
    icon: <ResumeIcon />,
  },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const heading = useReveal();
  const channelsReveal = useReveal();
  const formReveal = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div ref={heading.ref} className={`text-center mb-12 ${reveal.heading(heading.visible)}`}>
          <p className="text-label uppercase text-primary mb-3 font-body">Get in Touch</p>
          <h2 className="text-section font-heading tracking-tight mb-4">
            Let's Work Together
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto font-body">
            Open to AI consulting, freelance projects, collaborations, and full-time roles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left — direct contact channels */}
          <div ref={channelsReveal.ref} className="space-y-3">
            {channels.map((c, idx) => {
              const card = reveal.scaleIn(channelsReveal.visible, idx * 80);
              return (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group flex items-center gap-4 p-4 rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/40 hover:bg-card/80 transition-all duration-200 ${card.className}`}
                  style={card.style}
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-heading font-semibold text-foreground">
                      {c.label}
                    </p>
                    <p className="text-xs text-muted-foreground font-body truncate">
                      {c.display}
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-body text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                    {c.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right — contact form */}
          <div ref={formReveal.ref} className={reveal.heading(formReveal.visible)}>
            {submitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-xl bg-card/60 backdrop-blur-md border border-primary/30">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-card-title font-heading font-bold mb-2">
                  Message Received
                </h3>
                <p className="text-muted-foreground font-body max-w-sm">
                  Thanks — Titus has received your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 rounded-xl bg-card/60 backdrop-blur-md border border-border"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block font-body">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block font-body">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block font-body">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block font-body">
                    Project Type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block font-body">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button variant="hero" type="submit" className="w-full">
                  Send Message <Send className="ml-1 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
