import { Response, Request } from "express";
import { User } from "../../models";

export default async function getUsers(req: Request, res: Response) {
	try {
		// get users from database
		const users = await User.find();
		// send the users to client
		res.status(200).json(users);
	} catch (error: any) {
		// if has no permission or another error send this message
		res.status(404).json({ message: error.message });
	}
}
