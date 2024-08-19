import bcrypt from "bcrypt";
import { prismaClient } from "../src/prisma-client.js";
import { supabase } from "../src/supabase-client.js";

const selectedData = {
  name: true,
  username: true,
  email: true,
  photo_profile: true,
}
let urlStorage = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/`;

const getUser = async (req, res) => {
  const { id } = req.params;
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
    res.status(200).json(record);
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
    if (!match) return res.status(404).json({ password: "password is wrong" });
    const updatedUser = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: selectedData
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
  // const file = req.file?.path.split("\\").slice(1).join("\\");
  const file = req.file;
  const dataUpdate = { photo_profile: file };
  if (!file) dataUpdate.photo_profile = null;
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
      select: { photo_profile: true },
    });
    if (!user) res.status(400).json("user is not found");

    if(file){
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`profile_image/${Date.now()}-${file.originalname}`, file.buffer, {
          contentType: file.mimetype,
        });
        dataUpdate.photo_profile = urlStorage + data.path;
      if (error) {
        throw error;
      }
    }
    const updatedPhotoProfile = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: dataUpdate,
      select: selectedData
    });
    
    const urlOldPhotoProfile = user.photo_profile?.replace(urlStorage, "");
    if (file && user.photo_profile) {
      const { error } = await supabase.storage
        .from("images")
        .remove([urlOldPhotoProfile]);
      if (error) {
        throw error;
      }
    }

    // updatedPhotoProfile.photo_profile = updatedPhotoProfile.photo_profile && `${baseUrl}/${updatedPhotoProfile.photo_profile}`;
    // if (user.photo_profile) {
    //   const photoProfilePath = path.join("public", user.photo_profile);
    //   if (updatedPhotoProfile) {
    //     fs.unlink(photoProfilePath, (err) => {
    //       if (err) {
    //         return res
    //           .status(500)
    //           .json({ error: "An error occurred while deleting the file." });
    //       }
    //     });
    //   }
    // }
    // res.status(201).json(updatedPhotoProfile);
    res.status(201).json({ message: "photo profile is updated" });
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
    if (!match)
      return res.status(404).json({ oldPassword: "old password is wrong" });
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

export { getUser, updateUser, updatePhotoProfile, updatePassword, deleteUser };
