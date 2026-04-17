import { Mail } from "lucide-react";

const items = [
  {
    label: "GitHub",
    href: "https://github.com/shiphrahblessing2-byte",
    icon: (
      <img
        src="https://cdn.simpleicons.org/github"
        alt=""
        width={20}
        height={20}
        className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
      />
    ),
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/tituskibet",
    icon: (
      <img
        src="https://cdn.simpleicons.org/linkedin"
        alt=""
        width={20}
        height={20}
        className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
      />
    ),
    external: true,
  },
  {
    label: "Email",
    href: "mailto:tituskibet@email.com",
    icon: (
      <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
    ),
    external: false,
  },
];

export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4"
    >
      <span className="block w-px h-12 bg-border" aria-hidden="true" />
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group p-1.5 rounded-md hover:-translate-y-0.5 transition-transform duration-200"
        >
          {item.icon}
        </a>
      ))}
      <span className="block w-px h-12 bg-border" aria-hidden="true" />
    </aside>
  );
}
