import express from "express";
import Connect_DB from "./models/connect_db.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.router.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
import cors from "cors";
import contentRouter from "./routes/content.router.js";
import locationRouter from "./routes/location.router.js";
import timeSheetRouter from "./routes/time_sheet.router.js";
app.use(cors());
Connect_DB();
//router
app.use("/auth", authRouter);
app.use("/content", contentRouter);
app.use("/location", locationRouter);
app.use("/time-sheet", timeSheetRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
