import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import conncetDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
//declerations
const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(morgan("combined"));
conncetDB();
//routes
app.use("/api/auth", userRouter);
app.use("/api/image/", imageRouter);

app.get("/", (req, res) => {
  res.json({ message: "API Working!" });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running on port ${PORT}`);
});
