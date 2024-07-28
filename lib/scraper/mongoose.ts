
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  //if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

  if(isConnected) return console.log('=> using existing database connection');

  try {
    await mongoose.connect('mongodb+srv://aaish:aaishah@cluster0.9neez6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error)
  }
}