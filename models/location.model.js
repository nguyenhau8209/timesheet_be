import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const locationSchema = new Schema(
  {
    locationName: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);
locationSchema.plugin(MongooseDelete, { deletedAt: true });
locationSchema.plugin(MongooseDelete, { overrideMethods: true });

const Location = mongoose.model("location", locationSchema);

export default Location;
