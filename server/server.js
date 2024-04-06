require("dotenv").config();
const express = require("express");
const connectDb = require("./src/config/mongodb");
const cors = require("cors");
const datasetRouter = require("./src/routes/dataset.routes");
const userRouter = require("./src/routes/user.routes");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/dataset/api/v1", datasetRouter);
app.use("/users/api/v1", userRouter);

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
