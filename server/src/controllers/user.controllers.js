const User = require("../models/user.models");
const bcrypt = require("bcrypt");

const userController = {
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
};

module.exports = userController;
