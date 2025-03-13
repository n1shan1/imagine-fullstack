import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

//create new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "User created.",
      user: { name: user.name },
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. User was not found in the database",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Please check the credentials entered!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully. ",
      user: { name: user.name, credits: user.creditBalance },
      token,
    });
  } catch (error) {
    console
      .log(error)
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "User credits fetched successfully.",
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// /razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//razorpay controller
export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await User.findById(userId);
    if (!userId || !planId || !userData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }
    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 5;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 10;
        amount = 20;
        break;

      case "Business":
        plan = "Business";
        credits = 20;
        amount = 50;
        break;

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid plan." });
    }

    const transactionData = {
      userId,
      amount,
      date: Date.now(),
      credits,
      plan,
    };
    const newTransaction = await Transaction.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }
      res.json({
        success: true,
        message: "Order created successfully.",
        order,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

//verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionResponse = await Transaction.findById(orderInfo.receipt);
      if (transactionResponse.payment) {
        return res.status(400).json({
          success: false,
          message: "Payment already verified.",
        });
      }
      const userData = await User.findById(transactionResponse.userId);
      const creditBalance =
        userData.creditBalance + transactionResponse.credits;
      await User.findByIdAndUpdate(userData._id, {
        creditBalance,
      });
      await Transaction.findByIdAndUpdate(transactionResponse._id, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Payment verified successfully.",
        credits: creditBalance,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Payment verification failed.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
