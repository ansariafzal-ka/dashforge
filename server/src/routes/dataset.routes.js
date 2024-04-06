const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const datasetControllers = require("../controllers/dataset.controller");

const upload = multer({ storage });

router.get("/", datasetControllers.getDataset);
router.get("/data", datasetControllers.getData);
router.post("/", upload.single("file"), datasetControllers.postDataset);
router.get("/analysis", datasetControllers.getAnalysis);
router.get("/statistics", datasetControllers.getStatistics);
router.get("/numeric", datasetControllers.getNumeric);
router.get("/non-numeric", datasetControllers.getNonNumeric);
router.delete("/delete/:id", datasetControllers.deleteDataset);
module.exports = router;
