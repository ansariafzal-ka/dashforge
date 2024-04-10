const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../config/jwt");

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

router.get("/", verifyToken, datasetControllers.getAllDataset);
router.post("/gen-ai-response/:id", datasetControllers.getSummary);
router.get("/:id", verifyToken, datasetControllers.getDataset);
router.get("/data/:id", verifyToken, datasetControllers.getData);
router.post(
  "/",
  verifyToken,
  upload.single("file"),
  datasetControllers.postDataset
);
router.get("/analysis/:id", verifyToken, datasetControllers.getAnalysis);
router.get("/statistics/:id", verifyToken, datasetControllers.getStatistics);
router.get("/numeric/:id", verifyToken, datasetControllers.getNumeric);
router.get("/non-numeric/:id", verifyToken, datasetControllers.getNonNumeric);
router.delete("/delete/:id", verifyToken, datasetControllers.deleteDataset);

module.exports = router;
