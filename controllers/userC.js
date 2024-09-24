const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginControl = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(200).send({ message: 'Invalid Email or Password', success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login Success', success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error ${error.message}` });
  }
};

const registerControl = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Missing required fields', success: false });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(200).send({ message: 'User already exists', success: false });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'Registered Successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `ERROR ${error.message}` });
  }
};

const authC = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = { loginControl, registerControl, authC };