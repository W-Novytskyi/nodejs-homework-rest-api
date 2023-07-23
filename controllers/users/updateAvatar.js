const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);

//   const { error } = updateSubscriptionSchema.validate(req.body);
//   if (error) {
//     throw HttpError(
//       400,
//       error.details.map((detail) => detail.message).join("; ")
//     );
//   }
//   const { _id } = req.user;
//   const result = await User.findByIdAndUpdate(_id, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "User not found");
//   }
//   res.json({
//     email: result.email,
//     subscription: result.subscription,
//   });
// };
