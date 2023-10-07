import Joi from "joi";
import { prismaClient } from "../src/prisma-client.js";

export const registerMiddleware = async (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name cannot be empty",
      "any.required": "Name is required",
    }),
    username: Joi.string().required().messages({
      "string.empty": "Username cannot be empty",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    photo_profile: Joi.string().allow("").messages({
      "string.empty": "Photo profile cannot be empty",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
    confirmPassword: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  })
    .custom((value, helpers) => {
      if (value.password !== value.confirmPassword)
        return helpers.error("register.password.diffrent");
    })
    .message({
      "register.password.diffrent":
        "password and confirm password is different",
    });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email } = req.body;
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(405).json({ error: "email already exist" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
