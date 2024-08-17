import { prismaClient } from "../src/prisma-client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const register = async (req, res) => {
  const { name, username, email, photo_profile, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        photo_profile: photo_profile,
        password: hashedPassword,
      },
    });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(201).json({
      message: "Create user is successfully created",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prismaClient.user.findUnique({
      where: { email: email },
      include: {
        refresh_token: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({email: "email is wrong"});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({password: "password is wrong"});
    const userId = user.id;
    const name = user.name;
    const username = user.username;
    const userEmail = user.email;
    const accessToken = jwt.sign(
      { userId, name, username, userEmail },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 5 * 60,
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, username, userEmail },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    if (user.refresh_token !== null) {
      await prismaClient.refreshToken.update({
        where: { userId: user.id },
        data: {
          token: refreshToken,
        },
      });
    } else {
      await prismaClient.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });
    }
    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    res.json({
      photoProfile: user.photo_profile,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the record." });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
  });
  try {
    const user = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!user) return res.sendStatus(204);
    const deleteToken = await prismaClient.refreshToken.delete({
      where: { token: refreshToken },
    });
  
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({ message: "logout is successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the record." });
  }
};

const refreshToken = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken, "pppppppppppppppp");
    if (!refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });
    const token = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            photo_profile: true
          },
        },
      },
    });
    if (!token) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = token.user.id;
        const name = token.user.name;
        const username = token.user.username;
        const userEmail = token.user.email;
        // let photoProfile = ""
        // if(user.photo_profile !== null) photoProfile = user.photo_profile
        const accessToken = jwt.sign(
          { userId, name, username, userEmail },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 15 * 60,
          }
        );
        res.cookie("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'None',
          secure: true
        });
        console.log(token.user.photo_profile);
        if(token.user.photo_profile.length > 0) token.user.photo_profile = `${baseUrl}/${token.user.photo_profile}`;
        res.json({
          photoProfile: token.user.photo_profile,
          accessToken: accessToken,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try{
    const { email } = req.body;
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });
    if (!user) return res.status(404).json({ email: "Email not found" });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 5 * 60,
      }
    );
    // const url = `${req.protocol}://${req.get("host")}/reset-password/${token}`;
    const url = `http://localhost:3000/reset-password/${token}`;
    const text = `Click this link to reset your password: ${url}`;
    await sendEmail(email, "Reset Password", text);
    // res.json({ message: "Email sent" });
    res.json(url);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

const sendEmail = async (email, subject, text) => {
  try {
      const transporter = nodemailer.createTransport({
          host: process.env.HOST,
          service: process.env.SERVICE,
          port: 587,
          secure: true,
          auth: {
              user: process.env.USER,
              pass: process.env.PASS,
          },
      });

      await transporter.sendMail({
          from: process.env.USER,
          to: email,
          subject: subject,
          text: text,
      });

      console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  }
};

export { register, login, logout, refreshToken, forgotPassword };