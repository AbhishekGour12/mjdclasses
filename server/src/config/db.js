import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://projects:123456ytrewq@cluster0.0qqnloi.mongodb.net/coaching?appName=Cluster0", {
      useNewUrlParser: true,
      
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
