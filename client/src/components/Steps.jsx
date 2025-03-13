import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-32 px-4"
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
        }}
        className="text-3xl sm:text-4xl font-semibold mb-2"
      >
        How it Works!
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.1 },
          },
        }}
        className="text-lg text-gray-600 mb-8"
      >
        Transform Words into Stunning Images
      </motion.p>
      <div className="space-y-6 w-full max-w-3xl text-sm">
        {stepsData.map((data, index) => (
          <motion.div
            custom={index}
            variants={stepVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            className="flex gap-4 p-5 px-8 bg-white/20 border border-gray-400 transition-all duration-500 "
            key={index}
          >
            <div className="flex-shrink-0 relative">
              <div className="absolute -left-4 -top-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <img src={data.icon} alt="" aria-hidden="true" className="mt-2" />
            </div>
            <div>
              <h2 className="text-xl text-gray-700 font-medium">
                {data.title}
              </h2>
              <p className="text-sm text-gray-600">{data.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
