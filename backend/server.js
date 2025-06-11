const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./lib/db");
dotenv.config();
const errorHandler = require("./middlewares/errorHandler");

//routes
const user = require("./routes/userRoutes");

//port and app initilize
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//
connectDb();

//routes
app.use("/api/auth", user);

//error handler
app.use(errorHandler);

//testing route
app.get("/", (req, res) => {
  res.send("Everything is ok");
});

//listen port
app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
