export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Titus Kibet. Built with precision.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground font-body">
          <a href="#" className="nav-link-animated icon-hover hover:text-foreground">GitHub</a>
          <a href="#" className="nav-link-animated icon-hover hover:text-foreground">LinkedIn</a>
          <a href="#contact" className="nav-link-animated icon-hover hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
