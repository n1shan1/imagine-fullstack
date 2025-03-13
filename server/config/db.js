import mongoose from "mongoose";

const conncetDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("[server]: Connected to MongoDB");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/imagine-main`);
};

export default conncetDB;
