const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const verifyToken = require("../config/jwt");

router.get("/verify-login", verifyToken, userController.verifyAuth);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", verifyToken, userController.logoutUser);
router.delete("/delete/:id", verifyToken, userController.deleteUser);

module.exports = router;
