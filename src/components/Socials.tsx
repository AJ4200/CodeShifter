
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

type SocialLink = {
  url: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    url: "https://www.linkedin.com",
    icon: <FaLinkedin />,
  },
  {
    url: "https://www.github.com",
    icon: <FaGithub />,
  },
];

const SocialsHeader: React.FC = () => {
  return (
    <div className="flex">
      {socialLinks.map((link, index) => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="mr-4"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

const SocialsFooter: React.FC = () => {
  return (
    <div className="flex">
      {socialLinks.map((link, index) => (
        <motion.a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="mr-4"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

export { SocialsHeader, SocialsFooter };
