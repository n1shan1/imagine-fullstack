import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, InstagramIcon } from "lucide-react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-10 bg-gray-50">
      {/* About the App Section */}
      <section className="max-w-3xl w-full mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">About the App</h2>
        <p className="text-lg text-center">
          This application is built to deliver an immersive, user-friendly
          experience using modern web technologies. It integrates smooth
          animations and responsive design to help you explore its features
          effortlessly.
        </p>
      </section>
      <hr className="w-full my-8 border-gray-300" />
      {/* About Me Section */}
      <section className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
        <p className="text-lg max-w-2xl text-center mx-auto">
          Hi, I’m Nishant. I’m a passionate full-stack developer dedicated to
          creating intuitive and dynamic web applications.
        </p>
        <div className="my-6 flex justify-center">
          <img
            src={assets.nishant}
            alt="Nishant Profile"
            className="rounded-full w-40 h-40 object-cover"
          />
        </div>
        <motion.div
          className="flex space-x-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/n1shan1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://twitter.com/n1sh_an1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com/in/nishantdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/niishantdev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              className="hover:scale-110 cursor-pointer transition-all duration-500"
              width={35}
            />
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
