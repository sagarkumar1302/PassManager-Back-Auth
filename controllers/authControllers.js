const UserModel = require("../models/user");
const AppModel = require("../models/application");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist. Please login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    res
      .status(201)
      .json({ message: "Signup Successfully", success: true, userModel });
    await userModel.save();
  } catch (err) {
    res.status(500).json({
      message: "Internal Sever Error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Email is incorrect.",
        success: false,
      });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(403).json({
        message: "Password is incorrect.",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
      userId : user._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Sever Error",
      success: false,
    });
  }
};
const getsignup = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
const appregister = async (req, res) => {
  try {
    const { appname, appusername, apppassword, userid } = req.body;
    const newUser = new AppModel({ appname, appusername, apppassword, userid });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
const getappregister = async (req, res) => {
  try {
    const users = await AppModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
const getappupdate =
  ("/update/:id",
  async (req, res) => {
    try {
      const updatedEntry = await AppModel.findByIdAndUpdate(
        req.params.id,
        req.body, // Update with the request body data
        { new: true } // Return the updated document
      );

      if (!updatedEntry) {
        return res.status(404).json({ message: "Password entry not found" });
      }

      res.json({
        message: "Password entry updated successfully",
        updatedEntry,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating password entry" });
    }
  });
const getappdelete =
  ("/delete/:id",
  async (req, res) => {
    try {
      const deletedEntry = await AppModel.findByIdAndDelete(req.params.id);
      if (!deletedEntry) {
        return res.status(404).json({ message: "Password entry not found" });
      }
      res.json({ message: "Password entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting password entry" });
    }
  });
module.exports = {
  signup,
  login,
  getsignup,
  appregister,
  getappregister,
  getappupdate,
  getappdelete,
};
