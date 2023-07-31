import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// get token in headers section of request
		let token = req.header("Authorization");

		// if token does not exist send message "access denied"
		if (!token) {
			return res.status(403).send("Access Denied");
		}

		// if token exist and start with "Bearer "
		if (token.startsWith("Bearer ")) {
			token = token.slice(7, token.length).trimLeft();
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET!);
		if (!verified)
			return res
				.status(401)
				.json({ msg: "You don't have acces to this action." });

		next();
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
