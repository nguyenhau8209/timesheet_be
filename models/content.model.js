import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);
const Content = mongoose.model("content", contentSchema);
export default Content;
