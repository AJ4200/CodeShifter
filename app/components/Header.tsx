import { LuGithub, LuLinkedin } from "react-icons/lu";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import LogoMark from "./LogoMark";

const Header = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <LuLinkedin size={18} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <LuGithub size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <div className="flex flex-col leading-none md:hidden">
            <span className="text-base font-semibold tracking-tight text-foreground">
              CodeShifter
            </span>
            <span className="text-[11px] text-muted-foreground">
              Groq-powered code translation
            </span>
          </div>
          <span className="sr-only">CodeShifter</span>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-[70%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center leading-none md:flex">
          <span className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            CodeShifter
          </span>
          <span className="text-[11px] text-muted-foreground sm:text-xs">
            Groq-powered code translation
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex">
            Beta
          </Badge>
          <ThemeToggle />
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
    </header>
  );
};

export default Header;
