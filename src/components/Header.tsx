import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGroq } from "react-icons/si";

const Header = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <FaLinkedin size={20} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <FaGithub size={20} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <span className="text-lg font-bold text-bg">CS</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sans text-lg font-bold tracking-tight text-foreground">
              CodeShifter
            </span>
            <span className="flex items-center gap-1 text-xs text-muted">
              powered by <SiGroq size={12} className="text-accent" />
              <span className="text-accent">Groq</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent sm:inline-flex">
            Beta
          </span>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
