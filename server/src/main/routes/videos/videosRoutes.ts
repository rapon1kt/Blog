import express from "express";
import { verifyToken } from "../../../middleware";
import { getVideos, getUserVideos, getVideo } from "../../../controllers";

const videosRoutes = express.Router();

// routes to get a single video or all the videos
videosRoutes.get("/", verifyToken, getVideos);
videosRoutes.get("/:videoId", verifyToken, getVideo);

// route to get user videos
videosRoutes.get("/:userId/videos", verifyToken, getUserVideos);

export default videosRoutes;
