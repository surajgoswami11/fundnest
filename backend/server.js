const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./lib/db");

//
const user = require("./routes/userRoutes");

//
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//
app.use(express.json());
app.use(cookieParser());

//
connectDb();

//
app.use("/api/auth", user);

//
app.get("/", (req, res) => {
  res.send("Everything is ok");
});

//
app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
