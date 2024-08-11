import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import userRouter from "./router/userRouter.js";
import taskRouter from "./router/taskRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRouter);

connectDB();

app.get("/", async (req, res) => {
  res.json(" welcome ");
});

app.listen(process.env.PORT, () => {
  console.log(`Sever connected htpp://localhost:${process.env.PORT}`);
});
