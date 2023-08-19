import { Response, Request } from "express";
import { Video } from "../../models";

export default async function getVideos(req: Request, res: Response) {
	try {
		// get videoId from params
		const { videoId } = req.params;
		// fetch videos in database and send to client
		const video = await Video.findById(videoId);
		res.status(200).json(video);
	} catch (error: any) {
		// if have an error send a message as error.message to client
		res.status(404).json({ message: error.message });
	}
}
