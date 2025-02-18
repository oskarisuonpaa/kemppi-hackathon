import mongoose from "mongoose";
import app from "./app";

const PORT: string | number = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
