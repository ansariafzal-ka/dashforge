require("dotenv").config();
const express = require("express");
const connectDb = require("./src/config/mongodb");
const cors = require("cors");
const datasetRouter = require("./src/routes/dataset.routes");
const userRouter = require("./src/routes/user.routes");
const CookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(CookieParser());

app.use("/api/v1/dataset", datasetRouter);
app.use("/api/v1/users", userRouter);

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
