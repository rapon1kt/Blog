import { Response, Request } from "express";
import { User } from "../../models";

export default async function getUser(req: Request, res: Response) {
	try {
		// get id in params of route
		const { id } = req.params;
		// fetch user in database and send to client
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error: any) {
		// if have an error send this error.message to client
		res.status(500).json(error.message);
	}
}
