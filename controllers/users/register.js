const bcrypt = require("bcrypt");
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
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = ctrlWrapper(register);

// "user": {
//     "email": "example@example.com",
//     "subscription": "starter"
//   }
// const addContact = async (req, res) => {
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, "missing required name field");
//   }
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };
