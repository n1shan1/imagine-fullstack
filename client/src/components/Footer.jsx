import React from "react";
import { InstagramIcon, Github, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center px-10 py-5 border-t border-gray-200">
      <p className="font-bold text-3xl my-3 sm:my-0">{"IMAGINE "} </p>
      <p className="flex-1 border-l border-gray-500 pl-4 text-sm text-gray-500 max-sm:hidden ml-2">
        {"Copyright"} <span className="font-bold">github.com/n1shan1</span>{" "}
        {"| MIT License"}
      </p>
      <span className="sm:hidden mb-4">github.com/n1shan1</span>{" "}
      <div className="flex gap-3">
        <a href="https://www.instagram.com/niishantdev/" target="_blank">
          {" "}
          <InstagramIcon
            className="hover:scale-110 cursor-pointer transition-all duration-500"
            width={35}
          />
        </a>
        <a href="https://github.com/n1shan1" target="_blank">
          <Github
            className="hover:scale-110 cursor-pointer transition-all duration-500"
            width={35}
          />
        </a>
        <a href="https://twitter.com/n1sh_an1" target="_blank">
          <Twitter
            className="hover:scale-110 cursor-pointer transition-all duration-500"
            width={35}
          />
        </a>
        <a
          href="https://linkedin.com/in/nishantdev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 cursor-pointer transition-all duration-500"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
