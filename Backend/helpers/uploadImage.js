import multer from "multer";
import express from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/images");
  },
  filename: function (req, file, cb) {
    const extention = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + extention);
  },
});

export const upload = multer({ storage: storage });