require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { userFileStorage, postFileStorage } from "../config/multer";
import { authRoutes, postsRoutes, usersRoutes } from "./routes";
import { createPost, updateUser } from "../controllers";
import { verifyToken } from "../middleware";

// CONFIGURATIONS

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

// FILE STORAGE CONFIGURATION

const userUpload = multer({ storage: userFileStorage }).single("upload");
const postUpload = multer({ storage: postFileStorage }).fields([
	{
		name: "pictures",
		maxCount: 5,
	},
	{ name: "archive", maxCount: 1 },
]);

// ROUTES WITH FILES

app.post("/posts/:userId", verifyToken, postUpload, createPost);
app.put("/users/:id", verifyToken, userUpload, updateUser);

// ROUTES

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// MONGOOSE CONFIGURATION
const PORT = process.env.PORT || 3001;
mongoose
	.connect(process.env.MONGOOSE_URL!)
	.then(() => {
		app.listen(PORT, () => console.log(`Server is online on port: ${PORT}`));
	})
	.catch((error) => console.log(`${error} did not connect`));
