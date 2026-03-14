import { LuGithub, LuHeart, LuLinkedin } from "react-icons/lu";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <LuLinkedin size={16} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <LuGithub size={16} />,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">CodeShifter</span>
          <span className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            &copy; {currentYear} CodeShifter.
            <span className="inline-flex items-center gap-1">
              Made with <LuHeart size={12} className="text-primary" /> by aj4200.
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            v0.2.0 · Powered by Groq
          </span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
