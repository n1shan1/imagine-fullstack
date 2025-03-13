import React, { useContext } from "react";
import { motion } from "framer-motion";
import { plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Razorpay } from "razorpay";
import { toast } from "react-toastify";
const BuyCredit = () => {
  const { user, BACKEND_URL, fetchCredits, token, setShowLogin, navigate } =
    useContext(AppContext);

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

  const initPayment = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Purchase credits",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/auth/verify`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.info(data.message);
            fetchCredits();
            navigate("/");
            toast.success("You have recieved your credits. Keep IMAGINIG!");
          }
        } catch (error) {
          console.log(error.message);
          toast.error("Payment failed. Please try again.");
        }
      },
    };
    const razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/razorpay`,
        { planId },
        { headers: { token } }
      );
      if (response.data.success) {
        initPayment(response.data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex flex-col text-center py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p
        variants={itemVariants}
        className="text-stone-600 w-[40%] mx-auto text-center gap-2 px-6 py-1 border bg-gradient-to-r from-blue-100 to-red-100 border-neutral-500 hover:shadow-lg hover:scale-[101%] transition-all duration-500 cursor-help mt-10"
      >
        CHOOSE YOUR PLAN
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="text-center text-3xl font-medium my-6 sm:my-10"
      >
        Get what suites you best!
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 mb-10"
        variants={containerVariants}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: index === 1 ? -8 : -5,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
            className={`flex flex-col items-center justify-center space-y-6 border ${
              index === 1 ? "border-blue-500 shadow-lg" : "border-gray-300"
            }  px-8 py-10 transition-all duration-300 relative`}
          >
            {index === 1 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute -top-3 bg-blue-500 text-white px-4 py-1 text-sm font-medium"
              >
                Most Popular
              </motion.div>
            )}
            <h1 className="font-medium text-2xl text-gray-700">{plan.id}</h1>
            <h1 className="font-medium text-sm text-gray-700 text-center">
              {plan.desc}
            </h1>
            <motion.div
              className="flex items-end"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            >
              <p
                className={`${
                  index === 1
                    ? "bg-gradient-to-r from-blue-600 via-green-500 to-red-400 inline-block text-transparent bg-clip-text"
                    : "font-bold"
                } font-bold text-3xl`}
              >
                {`₹${plan.price} /  `}
              </p>
              <p className="font-medium text-base pl-2 pb-1">{`${plan.credits} credits`}</p>
            </motion.div>
            <motion.button
              onClick={() => paymentRazorpay(plan.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 w-full py-2 px-4 ${
                index === 1
                  ? "bg-gradient-to-r from-blue-600 via-green-500 to-red-400 text-white"
                  : "border border-black text-black hover:bg-gray-100"
              } font-medium transition-colors`}
            >
              {user ? "Get Started" : "Choose Plan"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
