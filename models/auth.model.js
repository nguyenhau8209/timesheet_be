import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";
const userSchema = new Schema(
  {
    email: { type: String, default: "example@gmail.com" },
    password: { type: String, default: "12345678" },
    fullName: { type: String, default: "Nguyen Van A" },
    avatar: {
      type: String,
      default:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg",
    },
    status: { type: Number, default: 1 },
    role: { type: Number, default: 1 },

    //status = 1: chua accept mail, 2: ok, 3:ban
    //role = 1: staff, 0: manager
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(MongooseDelete, { deletedAt: true });
userSchema.plugin(MongooseDelete, { overrideMethods: true });

const userModel = mongoose.model("Users", userSchema);

export default userModel;
