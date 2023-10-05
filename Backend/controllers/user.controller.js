import bcrypt from "bcrypt";
import { prismaClient } from "../src/prisma-client.js";
import fs from "fs";
import path from "path";

const getUser = async (req, res) => {
  const { id } = req.params;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const record = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        photo_profile: true,
      },
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    if(record.photo_profile !== null) record.photo_profile = `${baseUrl}/${record.photo_profile}`;
    res.json(record);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the record." });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password } = req.body;
  try {
    let updateData = { name, username, email };
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
      select: { password: true },
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({password: "password is wrong"});
    const updatedUser = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        name: true,
        username: true,
        email: true,
        photo_profile: true,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

const updatePhotoProfile = async (req, res) => {
  const { id } = req.params;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const file = req.file?.path.split("\\").slice(1).join("\\");
  if (!file) res.status(400).json('photo profile is not uploaded')
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
      select: { photo_profile: true },
    });
    if(!user) res.status(400).json('user is not found')
    const updatedPhotoProfile = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: {
        photo_profile: file
      },
      select: {
        name: true,
        username: true,
        email: true,
        photo_profile: true,
      },
    });
    updatedPhotoProfile.photo_profile = `${baseUrl}/${updatedPhotoProfile.photo_profile}`;
    if (user.photo_profile) {
      const photoProfilePath = path.join("public", user.photo_profile);
      if (file && updatedPhotoProfile) {
        fs.unlink(photoProfilePath, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "An error occurred while deleting the file." });
          }
        });
      }
    }
    res.status(201).json(updatedPhotoProfile);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
      select: { password: true },
    });
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(404).json({oldPassword: "old password is wrong"});
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: {
        password: hashedPassword,
      },
    });
    res.json("pasword is updated");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the password." });
  }
};

const deleteUser = (req, res) => {
  try {
    // const res = await
  } catch (err) {
    console.log(err.message);
  }
};

export { getUser, updateUser, updatePhotoProfile, updatePassword, deleteUser }