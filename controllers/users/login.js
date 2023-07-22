const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, loginSchema } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const SECRET_KEY = "S6XLr6_C'f?9nZ8`l^`gt%jo=8$*s]";

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join("; ");
    throw HttpError(400, errorMessage);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = ctrlWrapper(login);
