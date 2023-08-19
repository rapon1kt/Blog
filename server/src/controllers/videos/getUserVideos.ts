import { Response, Request } from "express";
import { Video } from "../../models";

export default async function getUserVideos(req: Request, res: Response) {
	try {
		// get userId from request params
		const { userId } = req.params;
		// fetch videos of user
		const userVideos = await Video.find({ owner: userId });
		// send the userVideos to client
		res.status(200).json(userVideos);
	} catch (error: any) {
		// if user does not exist send this message as error.message
		res.status(404).json({ message: error.message });
	}
}
