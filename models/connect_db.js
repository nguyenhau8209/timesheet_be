import mongoose from "mongoose";

const db =
  "mongodb+srv://conghaunguyen909:nguyenhau8209@cluster0.bnq5nvo.mongodb.net/timesheetdb";
const Connect_DB = () => {
  mongoose
    .connect(db)
    .then(() => console.log("Connected!"))
    .catch((e) => console.log(e));
};
export default Connect_DB;
