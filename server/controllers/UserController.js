const USERMODEL = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatusCodes = require("../constants/HttpStatusCodes");
const createToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

module.exports.user_sign_up = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Please fill all the blanks." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    if (!hash_password)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Password cannot be hashed. Please try again." });
    const response = await USERMODEL.create({
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

    console.log(response)
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

module.exports.user_sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Please fill all the blanks." });
    }

    const response = await USERMODEL.findOne({ email });
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Invalid credentials. Please try again." });
    }

    const match_password = await bcrypt.compareSync(password, response.password);
    if (!match_password)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Invalid Password. Please try again." });
    const token = createToken(response._id, response.name, response.email)
    return res
      .status(httpStatusCodes.OK)
      .json({ response, msg: "You have successfully logged in.", token });
  } catch (error) {
    console.error(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        "Something is wrong. If errors persists, please contact administrator.",
    });
  }
};


module.exports.fetch_user = async (req, res) => {
  try {
    // Retrieve the email from the request headers
    const email = req.headers.email;

    if (!email) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Email is required." });
    }

    // Find the user by their email in the database
    const user = await USERMODEL.findOne({ email });

    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: "User not found." });
    }

    // Remove sensitive information such as the password from the user data before sending the response
    const { password, ...userDetails } = user.toObject();

    return res.status(httpStatusCodes.OK).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: "Something went wrong. Please try again later.",
      });
  }
};


module.exports.update_user = async (req, res) => {
  try {
    // Get the email from request headers (assuming email is used for identifying users)
    const email = req.headers.email;

    // Check if email is provided
    if (!email) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Email is required for updating user profile." });
    }

    // Get updated data from the request body
    const { name, phone, password } = req.body;

    // Find the user by email
    const user = await USERMODEL.findOne({ email });

    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: "User not found." });
    }

    // Update fields only if they are provided in the request body
    if (name) user.name = name;
    if (phone) user.phone = phone;

    // If password is provided, hash the new password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user data in the database
    const updatedUser = await user.save();

    // Remove password from the response object
    const { password: removedPassword, ...userDetails } = updatedUser.toObject();

    return res
      .status(httpStatusCodes.OK)
      .json({ user: userDetails, msg: "Profile updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};
