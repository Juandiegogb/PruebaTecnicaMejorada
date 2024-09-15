import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../tools/token.js";
const controller = {};

controller.createUser = async (req, res) => {
  const { name, username, password, rol } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  console.log(req.body);
  await user
    .create({ name, username, password: encryptPassword, rol })
    .then(() => {
      res.status(200).json({ message: "User created" });
    })
    .catch((error) => {
      const code = error.errorResponse.code;
      console.log(error);
      if (code === 11000)
        res.status(400).json({ message: "Duplicated username" });
    });
};

controller.findUsers = async (req, res) => {
  await user
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

controller.deleteUser = async (req, res) => {
  const id = req.params.id;
  await user
    .deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

controller.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = await user.find({ username });
    let userInfo;
    try {
      userInfo = query[0].toObject();
    } catch (error) {
      userInfo = false;
    }
    if (userInfo) {
      const comparePassword = bcrypt.compareSync(password, userInfo.password);
      if (comparePassword) {
        delete userInfo.password;
        const token = createToken(userInfo);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ userInfo , message: "fineee" });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ message: "Incorrect user" });
    }
  } catch (error) {
    console.log(error);
  }
};

controller.logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Bye" });
};

export default controller;
