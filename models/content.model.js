import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

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
contentSchema.plugin(MongooseDelete, { deletedAt: true });
contentSchema.plugin(MongooseDelete, { overrideMethods: true });

const Content = mongoose.model("content", contentSchema);
export default Content;
