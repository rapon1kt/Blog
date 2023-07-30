require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { userFileStorage, postFileStorage } from "../config/multer";
import multer from "multer";

// CONFIGURATIONS

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

// FILE STORAGE CONFIGURATION

const userUpload = multer({ storage: userFileStorage }).single("upload");
const postUpload = multer({ storage: postFileStorage }).array("upload", 2);
