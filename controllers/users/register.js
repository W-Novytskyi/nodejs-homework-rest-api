const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User, registerSchema } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join("; ");
    throw HttpError(400, errorMessage);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = ctrlWrapper(register);
