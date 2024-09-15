import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.uri;
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
