export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex Engineer. Built with precision.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
