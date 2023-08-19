import { Response, Request } from "express";
import { Video } from "../../models";

export default async function createVideo(req: Request, res: Response) {
	try {
		// get informations from request
		const { userId } = req.params;
		const { title, description } = req.body;
		const video = req.file;
		// create the new post
		const newVideo = new Video({
			title,
			description,
			url: video?.filename,
			owner: userId,
		});
		const createdVideo = await newVideo.save();
		// send this post to client
		res.status(201).json(createdVideo);
	} catch (error: any) {
		// if have an server error return an message as error.message
		res.status(409).json({ message: error.message });
	}
}
