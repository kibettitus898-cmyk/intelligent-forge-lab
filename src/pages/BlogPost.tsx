import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { SocialRail } from "@/components/portfolio/SocialRail";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { getPostBySlug } from "@/data/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen pb-20 md:pb-0 pt-16 md:pt-20">
      <Navbar />
      <SocialRail />
      <main id="main-content">
        <article className="section-padding">
          <div className="mx-auto px-5 sm:px-6 md:px-8" style={{ maxWidth: "min(65ch, 100%)" }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to all posts
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-4 text-[13px] text-muted-foreground mb-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border border-primary/30 bg-primary/10 text-primary">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="border-t border-white/[0.06] pt-10 [&_img]:rounded-xl [&_img]:shadow-[0_8px_32px_rgba(0,0,0,0.4)] [&_img]:border [&_img]:border-white/[0.06]">
              <MarkdownRenderer content={post.content} />
            </div>

            <div className="mt-16 pt-8 border-t border-white/[0.06]">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
