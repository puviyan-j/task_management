import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db not connected");
    });
};

export default connectDB;
