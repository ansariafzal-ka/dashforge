const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.post("/", userController.createUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
