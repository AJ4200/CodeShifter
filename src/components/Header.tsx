import { FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abel-majadibodu-5a0583193/",
      icon: <FaLinkedin size={25} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/AJ4200",
      icon: <FaGithub size={25} />,
    },
  ];

  return (
    <header className="z-50 fixed -top-2 shadow-lg backdrop-blur-sm bg-gray-400/20 w-full flex justify-center  px-4 py-2">
      <h1 className="text-6xl font-bold text-center text-white textshadow">
        Code Shifter
        <span className="text-xs border border-white shadow-2xl rounded-md p-1">
          Beta
        </span>
      </h1>
      <div className="flex space-x-1 top-8 fixed right-2 textshadow headericons">
        {socialLinks.map((link, index) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="text-gray-100 hover:text-black transition-colors duration-300"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
