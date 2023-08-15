import express from "express";
import { verifyToken } from "../../../middleware";
import { getFeedPost, getUserPosts, newComment } from "../../../controllers";

const postsRoutes = express.Router();

// get feed post and especific user posts
postsRoutes.get("/", verifyToken, getFeedPost);
postsRoutes.get("/:userId/posts", verifyToken, getUserPosts);
postsRoutes.put("/:postId", verifyToken, newComment);

export default postsRoutes;
