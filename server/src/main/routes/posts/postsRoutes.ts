import express from "express";
import { verifyToken } from "../../../middleware";
import { getFeedPost, getUserPosts } from "../../../controllers";

const postsRoutes = express.Router();

// get feed post and especific user posts
postsRoutes.get("/", verifyToken, getFeedPost);
postsRoutes.get("/:userId/posts", verifyToken, getUserPosts);

export default postsRoutes;
