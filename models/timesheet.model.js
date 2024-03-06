import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const timeSheetSchema = new Schema(
  {
    userID: { type: String, require: true, trim: true },
    start_date: { type: Date, default: () => Date.now(), require: true },
    end_date: {
      type: Date,
      default: function () {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate.getTime();
      },
      require: true,
    },
    contentID: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    locationID: { type: String, require: true, trim: true },
    status: { type: Number, require: true, trim: true },
  },
  { timestamps: true }
);
timeSheetSchema.plugin(MongooseDelete, { deletedAt: true });
timeSheetSchema.plugin(MongooseDelete, { overrideMethods: true });

const TimeSheet = mongoose.model("time_sheet", timeSheetSchema);

export default TimeSheet;
