import express from "express";
import { verifyToken } from "../../../middleware";

const videosRoutes = express.Router();

// routes to get a single user or all the users
videosRoutes.get("/", verifyToken, () => {
	console.log("Happy");
});

export default videosRoutes;
