const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  filename: {
    type: String,
    required: true,
  },
  dataset: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    requrired: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dataset", datasetSchema);
