const { User, updateSubscriptionSchema } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { error } = updateSubscriptionSchema.validate(req.body);
  if (error) {
    throw HttpError(
      400,
      error.details.map((detail) => detail.message).join("; ")
    );
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = ctrlWrapper(updateSubscription);
