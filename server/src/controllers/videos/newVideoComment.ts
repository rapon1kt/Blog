import { Request, Response } from "express";
import { Video } from "../../models";

export default async function newVideoComment(req: Request, res: Response) {
	try {
		// get videoId from request params
		const { videoId } = req.params;
		// get text and owner of comment
		const { text, owner } = req.body;
		// find post with videoId params
		const video = await Video.findById(videoId);
		// push new comment to post
		video?.comments.push({ text, owner });
		// save and send comment
		const savedComment = await video?.save();
		res.status(201).json({
			message: "Seu comentário foi publicado com sucesso!",
			comment: savedComment,
		});
	} catch (err: any) {
		// if have an server error return an message as error.message
		res.status(500).json({
			message: "Não foi possível publicar seu comentário.",
			error: err,
		});
	}
}
