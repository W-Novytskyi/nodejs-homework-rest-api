const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(tempUpload);
  } catch (error) {
    res.status(500).json({ message: "Failed to resize image" });
  }

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
