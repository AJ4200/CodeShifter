import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aj4200",
      icon: <FaLinkedin />,
    },
    {
      name: "GitHub",
      url: "https://github.com/aj4200",
      icon: <FaGithub />,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <div className="mx-auto py-4 flex">
        <div className="flex items-center space-x-1 pr-1">
          {socialLinks.map((link, index) => (
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-center text-gray-500">
         by aj4200 &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
