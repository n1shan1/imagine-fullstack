import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Fixed import
import GenerateBtn from "./GenerateBtn";

const Header = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.97], // Custom cubic bezier for more springy effect
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col justify-center items-center text-center my-20 px-4"
    >
      <motion.div
        variants={bannerVariants}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        className="text-stone-600 inline-flex text-center gap-2 px-6 py-1 border bg-gradient-to-r from-blue-100 to-red-100 border-neutral-500 hover:shadow-lg cursor-help"
      >
        <p>Text to Image in seconds!</p>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-3xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        Realize your imagination into reality with{" "}
        <motion.span
          variants={highlightVariants}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)",
          }}
          className="text-7xl font-extrabold bg-gradient-to-bl from-blue-500 to-red-800 bg-clip-text text-transparent leading-normal"
        >
          IMAGINE
        </motion.span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-xl font-semibold text-center max-w-xl mx-auto mt-5"
      >
        Unleash the artist inside you and get going with the hassle-less image
        generator today!
      </motion.p>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <GenerateBtn />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="hidden sm:flex justify-between gap-2 mt-10"
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              custom={index}
              variants={imageVariants}
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 },
              }}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              key={index}
              className="rounded-lg cursor-pointer max-sm w-20 shadow-md"
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default Header;
