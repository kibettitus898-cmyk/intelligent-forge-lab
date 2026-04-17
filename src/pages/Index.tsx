import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { SocialRail } from "@/components/portfolio/SocialRail";
import { Hero } from "@/components/portfolio/Hero";
import { Metrics } from "@/components/portfolio/Metrics";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Process } from "@/components/portfolio/Process";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <ScrollProgress />
      <Navbar />
      <SocialRail />
      <Hero />
      <Metrics />
      <About />
      <Projects />
      <Skills />
      <Process />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
