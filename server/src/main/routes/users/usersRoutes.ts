import express from "express";
import { verifyToken } from "../../../middleware";
import { getUser, getUsers } from "../../../controllers";

const usersRoutes = express.Router();

// routes to get a single user or all the users
usersRoutes.get("/", verifyToken, getUsers);
usersRoutes.get("/:id", verifyToken, getUser);

export default usersRoutes;
