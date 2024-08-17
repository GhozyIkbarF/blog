import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import { prismaClient } from "../src/prisma-client.js";
import fs from "fs";
import path from "path";

const selectAuthor = {
  name: true,
  username: true,
  email: true,
  photo_profile: true,
};

const createPost = async (req, res) => {
  const { authorId, title, content, published, category } = req.body;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const file = req.file.path.split("\\").slice(1).join("\\");
  try {
    const post = await prismaClient.post.create({
      data: {
        title: title,
        image: file,
        content: content,
        published: JSON.parse(published),
        category: category,
        author: {
          connect: { id: parseInt(authorId) },
        },
      },
      include: {
        author: {
          select: selectAuthor,
        },
      },
    });
    if (post) post.image = `${baseUrl}/${post.image}`;
    if (post.author.photo_profile !== null) post.author.photo_profile = `${baseUrl}/${post.author.photo_profile}`;
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: selectAuthor,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts) {
      posts.forEach((post) => {
        post.image = `${baseUrl}/${post.image}`;
        if (post.author.photo_profile !== null) post.author.photo_profile = `${baseUrl}/${post.author.photo_profile}`;
      });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const searchPosts = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  const whereCondition = {};

  if (token == null) {
    whereCondition.published = true;
    whereCondition.title = { contains: req.query.search };
  } else jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const decoded = jwt_decode(token);
      if (parseInt(decoded.userId) != parseInt(req.query.id)) {
        whereCondition.published = true;
        whereCondition.authorId = parseInt(req.query.id);
      } else whereCondition.authorId = parseInt(req.query.id);
    }
  })

  try {
    if(req.query.category?.length > 0) whereCondition.category = { equals: req.query.category };
    if(req.query.id) whereCondition.authorId = parseInt(req.query.id);
    const posts = await prismaClient.post.findMany({
      where: whereCondition,
      include: {
        author: {
          select: selectAuthor
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts) {
      posts.forEach((post) => {
        post.image = `${baseUrl}/${post.image}`;
        if (post.author.photo_profile !== null) post.author.photo_profile = `${baseUrl}/${post.author.photo_profile}`;
      });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfilePosts = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  let authorId = parseInt(req.params.id);
  const whereCondition = { authorId: parseInt(req.params.id) };
  try {
    if (token == null) whereCondition.published = true;
    else
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          whereCondition.published = true;
        } else {
          const decoded = jwt_decode(token);
          if (decoded.userId != authorId) {
            whereCondition.published = true;
          } else {
          }
        }
      });
    const posts = await prismaClient.post.findMany({
      where: whereCondition,
      include: {
        author: {
          select: selectAuthor,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts) {
      posts.forEach((post) => {
        post.image = `${baseUrl}/${post.image}`;
      });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const post = await prismaClient.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: {
          select: selectAuthor,
        },
      },
    });
    post.image = `${baseUrl}/${post.image}`;
    if (post.author.photo_profile !== null) post.author.photo_profile = `${baseUrl}/${post.author.photo_profile}`;
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const { authorId, title, content, published, category } = req.body;
  const file = req.file?.path.split("\\").slice(1).join("\\");
  try {
    let updateData = { authorId, title, content, published, category };
    updateData.authorId = parseInt(authorId);
    updateData.published = JSON.parse(published);
    if (file) updateData.image = file;
    const [searchPost, post] = await prismaClient.$transaction(
      async (prisma) => {
        const searchPost = await prisma.post.findUnique({
          where: { id: parseInt(req.params.id) },
          select: {
            image: true,
          },
        });

        const post = await prisma.post.update({
          where: { id: parseInt(req.params.id) },
          data: updateData,
          include: {
            author: {
              select: selectAuthor,
            },
          },
        });
        return [searchPost, post];
      }
    );
    const imagePath = path.join("public", searchPost.image);
    post.image = `${baseUrl}/${post.image}`;
    if (post.author.photo_profile !== null) post.author.photo_profile = `${baseUrl}/${post.author.photo_profile}`;
    if (searchPost.image) {
      if (file && post) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "An error occurred while deleting the file." });
          }
        });
      }
    }
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await prismaClient.post.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (post) {
      const imagePath = path.join("public", post.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while deleting the file." });
        }

        res.json({ message: "Post deleted successfully." });
      });
    }
  } catch (err) {
    res.status().json({ message: err.message });
  }
};

export {
  createPost,
  getPosts,
  getProfilePosts,
  getPost,
  searchPosts,
  updatePost,
  deletePost,
};
