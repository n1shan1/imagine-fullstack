import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  credits: {
    type: Number,
    requiered: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

const Transaction =
  mongoose.model.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
export default Transaction;
