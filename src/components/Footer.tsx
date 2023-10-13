import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <FaLinkedin />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <FaGithub />,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-1">
      <div className="mx-auto py-4 flex">
        <div className="flex items-center space-x-1 pr-1">
          {socialLinks.map((link, index) => (
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="text-black hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-center text-gray-200 textshadow">
         by aj4200 &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
