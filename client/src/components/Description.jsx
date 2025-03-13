import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-4xl font-semibold mb-2 text-center"
      >
        Create Stunning{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text">
          AI
        </span>{" "}
        images
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-center text-sm font-light"
      >
        Turn Your Imagination into something the world can appreciate!
      </motion.p>
      <div className="flex flex-col gap-5 lg:gap-14 lg:flex-row items-center justify-center my-10">
        <motion.img
          variants={imageVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
            rotate: [-0.5, 0.5, -0.5, 0],
            transition: { duration: 0.5 },
          }}
          src={assets.sample_img_1}
          alt="AI generated image example"
          className="w-80 xl-w-96 shadow-xl duration-700 ease-in-out"
        />
        <div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold max-w-lf mb-4"
          >
            The{" "}
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text">
              AI
            </span>{" "}
            powered Text-to-Image Generator.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-4 text-justify"
          >
            Easily bring your ideas to life with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text">
              IMAGINE
            </span>{" "}
            and let your creativity flow. Our AI-powered tool will transform
            your text into stunning images. Whether you are an artist looking to
            visualize your concepts, a marketer in need of eye-catching visuals,
            or just someone who loves to create, IMAGINE is here to help. With
            our advanced algorithms, you can generate high-quality images in
            seconds.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-4 text-justify"
          >
            Simply input your text, and watch as our AI brings your vision to
            life. No design skills required! Join thousands of users who are
            already using IMAGINE to create beautiful, unique images. Start your
            creative journey today and see what you can create with the power of
            AI.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
