const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.empty": `Password is required`,
    "string.min": `Password should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.empty": `Email is required` }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.empty": `Password is required`,
    "string.min": `Password should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.empty": `Email is required` }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.empty": `missing required field email` }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};
