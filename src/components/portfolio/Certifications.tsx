import { useReveal, reveal } from "@/hooks/useReveal";
import { ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  logo: string;
  accent: string;
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    logo: "https://cdn.simpleicons.org/amazonaws",
    accent: "#FF9900",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    issuer: "Oracle",
    logo: "https://cdn.simpleicons.org/oracle",
    accent: "#F80000",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 DevOps Professional",
    issuer: "Oracle",
    logo: "https://cdn.simpleicons.org/oracle",
    accent: "#F80000",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    issuer: "Oracle",
    logo: "https://cdn.simpleicons.org/oracle",
    accent: "#F80000",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Data Science Professional",
    issuer: "Oracle",
    logo: "https://cdn.simpleicons.org/oracle",
    accent: "#F80000",
  },
];

export function Certifications() {
  const heading = useReveal();
  const grid = useReveal();

  return (
    <section id="certifications" className="section-padding">
      <div className="container-narrow">
        <div ref={heading.ref} className={`text-center mb-12 ${reveal.heading(heading.visible)}`}>
          <p className="text-label uppercase text-primary mb-3 font-body">Credentials</p>
          <h2 className="text-section font-heading tracking-tight mb-4">Certifications</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto font-body">
            Verified credentials across cloud, AI, and DevOps
          </p>
        </div>

        <div ref={grid.ref} className="grid grid-cols-1 min-[540px]:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const card = reveal.scaleIn(grid.visible, idx * 100);
            return (
              <div
                key={cert.title}
                className={`group relative overflow-hidden rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/30 transition-colors duration-300 flex flex-col ${card.className}`}
                style={card.style}
              >
                {/* Top accent line */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: cert.accent }}
                  aria-hidden="true"
                />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-8 h-8 shrink-0 rounded-md bg-white/95 flex items-center justify-center p-1"
                      aria-hidden="true"
                    >
                      <img
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-card-title font-heading font-bold leading-tight mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/60">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Certificate — On Request
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
