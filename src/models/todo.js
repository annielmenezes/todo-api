import mongoose from "mongoose";
const schema = mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Todo", schema);
