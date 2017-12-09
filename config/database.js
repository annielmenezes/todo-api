import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/test";

mongoose.Promise = global.Promise;

export const connect = () =>
  mongoose.connect(MONGO_URI, {
    useMongoClient: true
  });

export default {
  connect
};
