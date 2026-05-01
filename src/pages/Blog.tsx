import { Link } from "react-router-dom";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { SocialRail } from "@/components/portfolio/SocialRail";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { posts } from "@/data/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const categoryStyles: Record<string, string> = {
  MLOps: "bg-primary/10 text-primary border-primary/30",
  "AI Agents": "bg-[hsl(180,60%,45%)]/10 text-[hsl(180,60%,55%)] border-[hsl(180,60%,45%)]/30",
  Cybersecurity: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Engineering: "bg-muted text-muted-foreground border-border",
};

export default function Blog() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 pt-16 md:pt-20">
      <Navbar />
      <SocialRail />
      <main id="main-content">
        <section className="section-padding">
          <div className="container-narrow">
            <header className="mb-14 md:mb-20 max-w-3xl">
              <p className="text-label uppercase tracking-[0.2em] text-primary mb-4">
                Engineering Log
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                Notes from the build.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Field notes on building AI agents, ML pipelines, and secure cloud systems.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_-8px_rgba(0,212,200,0.25)]"
                >
                  {/* Top meta */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${categoryStyles[post.category] ?? categoryStyles.Engineering}`}
                    >
                      {post.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h2 className="font-heading text-xl md:text-[1.35rem] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-4 text-[12px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
