import { prismaClient } from "../src/prisma-client.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });
    const token = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
      include: {
        // user: true
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            // photo_profile: true
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
            expiresIn: 5 * 60,
          }
        );
        res.cookie("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          // secure: true //untuk htpps
        });
        res.json({
          // photoProfile: user.photo_profile,
          photoProfile: "",
          accessToken: accessToken,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
