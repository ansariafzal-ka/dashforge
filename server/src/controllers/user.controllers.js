const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  verifyAuth: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      const { password, ...userInfo } = user._doc;
      res
        .status(200)
        .json({ message: "User logged in", user_details: userInfo });
    } catch (error) {
      res.status(500).json({ message: "error : ", error });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already present" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "cannont create user : ", error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(201).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "cannont create user : ", error });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User  not found!" });
      }

      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!comparePassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const { password, ...userInfo } = user._doc;

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
        })
        .status(200)
        .json(userInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logoutUser: async (req, res) => {
    res
      .clearCookie("accessToken", { sameSite: "none", secure: false })
      .status(200)
      .send({ message: "Logged out successfully" });
  },
};

module.exports = userController;
