const USERMODEL = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatusCodes = require("../constants/HttpStatusCodes");
const createToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const user_sign_up = (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Please fill all the blanks." });
    }

    const salt = bcrypt.genSalt(10);
    const hash_password = bcrypt.hash(password, salt);
    if (!hash_password)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Password cannot be hashed. Please try again." });
    const response = USERMODEL.create({
      name,
      email,
      phone,
      password: hash_password,
    });
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Failed to create an account." });

    const token = createToken(response._id, response.name, response.email);
    res.cookie("token", token, { maxAge: 300000 });

    return res
      .status(httpStatusCodes.OK)
      .json({ response, msg: "Account has been created.", token });
  } catch (error) {
    console.error(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        "Something is wrong. If errors persists, please contact administrator.",
    });
  }
};

const user_sign_in = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Please fill all the blanks." });
    }

    const response = USERMODEL.findOne({ email });
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Invalid credentials. Please try again." });
    }

    const match_password = bcrypt.compareSync(password, response.password);
    if (!match_password)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Invalid Password. Please try again." });

    return res
      .status(httpStatusCodes.OK)
      .json({ response, msg: "Account has been created." });
  } catch (error) {
    console.error(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        "Something is wrong. If errors persists, please contact administrator.",
    });
  }
};
