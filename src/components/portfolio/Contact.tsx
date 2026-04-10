import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useReveal, reveal } from "@/hooks/useReveal";

const projectTypes = ["AI Agent Development", "LLM Application", "Model Training", "Consulting", "Full-Time Opportunity", "Other"];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", projectType: "", message: "" });
  const heading = useReveal();
  const formReveal = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div ref={heading.ref} className={reveal.slideRight(heading.visible)}>
            <p className="text-label uppercase text-primary mb-3 font-body">Get in Touch</p>
            <h2 className="text-section font-heading tracking-tight mb-6">
              Let's build something intelligent together
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 font-body">
              I'm open to AI consulting engagements, freelance projects, collaborations, and full-time opportunities. Whether you're a startup exploring AI for the first time or an enterprise scaling existing systems — let's talk.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground font-body">
              <p>📍 Available for remote & hybrid work</p>
              <p>⏱ Typical response time: 24 hours</p>
              <p>🤝 NDA-ready for sensitive projects</p>
            </div>
          </div>

          <div ref={formReveal.ref}>
            <form onSubmit={handleSubmit} className={`space-y-4 ${reveal.heading(formReveal.visible)}`}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block font-body">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block font-body">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block font-body">Company</label>
                <input
                  type="text"
                  maxLength={100}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  placeholder="Your company (optional)"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block font-body">Project Type</label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block font-body">Message</label>
                <textarea
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button variant="hero" type="submit" className="w-full sm:w-auto">
                Send Message <Send className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
