const express = require("express");
const router = express.Router();
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const middleware = require("../middleware/middleware");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    let exist = await User.findOne({ email }).maxTimeMS(15000);
    if (exist) {
      return res.status(400).send("User Already Exist");
    }
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    let newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    //save user and respond
    await newUser.save();
    res.status(200).json({ message: "Registration Successfull", newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internel Server Error");
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find User
    let existingUser = await User.findOne({ email }).maxTimeMS(15000);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Couldn't Find User By This Email" });
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    let payload = {
      user: {
        id: existingUser.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwt_secret,
      { expiresIn: 30000 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

// get logged in user details
router.get("/getLoggedInUserDetails", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// get all the users (patrons)
router.get("/get-all-users/:role", middleware, async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});
// get user by id
// get user by id
router.get("/getUserById/:id", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    return res.send({
      success: false,
      message: 'User does not exist',
    });
  }
});

//update user details

router.put("/update-user/:id", middleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated Successfully", updatedUser });
  } catch (err) {
    {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
