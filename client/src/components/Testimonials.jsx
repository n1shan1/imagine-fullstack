import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import GenerateBtn from "./GenerateBtn";
import { motion } from "framer-motion";

const Testimonials = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-20 py-12 px-1"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-4xl font-semibold mb-2 text-center"
      >
        Customer{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text">
          Testimonials
        </span>{" "}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-center text-sm font-light mb-12"
      >
        What our valuable customers are saying about us.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            custom={index}
            variants={testimonialVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
              transition: { duration: 0.3 },
            }}
            className="flex flex-col space-y-6 border border-gray-300 px-8 py-6 transition-all duration-500 ease-in-out shadow rounded-lg"
            key={index}
          >
            <div className="flex flex-col">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} profile picture`}
                className="rounded-full w-14 mx-auto"
              />
              <h2 className="text-center font-medium text-xl">
                {testimonial.name}
              </h2>
              <p className="text-center text-sm font-normal">
                {testimonial.role}
              </p>
              <div className="flex mb-4 text-center justify-center">
                {Array(testimonial.stars)
                  .fill()
                  .map((star, index) => (
                    <img
                      key={index}
                      src={assets.rating_star}
                      alt="star rating"
                      aria-hidden="true"
                    />
                  ))}
              </div>
              <p className="text-justify text-stone-500">{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={containerVariants}
        className="flex flex-col items-center my-10 px-1"
      >
        <motion.p
          variants={itemVariants}
          className="mt-10 text-4xl font-semibold text-center"
        >
          Start your journey with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text">
            IMAGINE
          </span>{" "}
          today!
        </motion.p>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <GenerateBtn />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;
