import express from "express";
import Connect_DB from "./models/connect_db.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.router.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
import cors from "cors";
app.use(cors());
Connect_DB();
//router
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
