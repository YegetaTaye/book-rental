const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //Register new user
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, email, username, password, phone } =
        req.body;

      //Validation
      if (!firstName | !lastName | !email | !username | !password | !phone)
        return res
          .status(400)
          .json({ msg: "Not all fields have been provided" });
      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password must be at least 8 characters!" });

      const foundEmail = await User.findOne({ email: email });
      const foundUsername = await User.findOne({ username: username });

      if (foundEmail)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists!" });
      if (foundUsername)
        return res
          .status(400)
          .json({ msg: "An account with this username already exists!" });
      else {
        //password encryption
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(password, salt);

        console.log(req.body);
        // const newUser = await User.create(req.body);
        const newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: req.body.password,
          phone: phone,
        };

        const user = await User.create(newUser);
        return res.status(201).send(user);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: err.message });
    }
  },
  //Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({ count: await users.length, data: users });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: err.message });
    }
  },
  //Get user by Id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });

      if (!user) return res.status(400).json({ msg: "User not found" });
      return res.status(200).send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: err.message });
    }
  },
  //Delete User by id
  deleteUserByEmail: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await User.findOneAndDelete({ _id: id });
      if (!deleted)
        return res.status(400).json({ msg: "User not EfoundEmail" });
      return res.status(200).send({ msg: "User deleted successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ msg: err.message });
    }
  },
  //Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(404)
          .json({ msg: "Not all fields have been provided" });

      const found = await User.findOne({ email });
      console.log(found._id);

      if (!found)
        return res
          .status(404)
          .json({ msg: "No account with this email has been registerd" });

      const isMatch = bcrypt.compareSync(password, found.password);
      if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });

      const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: found._id,
          display_name: found.username,
        },
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: err.message });
    }
  },
  numberOfAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({ count: users.length });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: err.message });
    }
  },
};
