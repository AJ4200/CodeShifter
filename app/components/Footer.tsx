import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <FaLinkedin size={16} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <FaGithub size={16} />,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 bg-gradient-to-r from-surface/70 via-surface to-surface/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">CodeShifter</span>
          <span className="text-xs text-muted">
            &copy; {currentYear} aj4200. Shift code faster with Groq.
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/70 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
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
