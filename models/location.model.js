import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
  locationName: {
    type: String,
    trim: true,
    require: true,
  },
});

const Location = mongoose.model("location", locationSchema);

export default Location;
