import { Request, Response } from "express";
import { Post } from "../../models";

export default async function getSinglePost(req: Request, res: Response) {
	try {
		// get id of post from req.params
		const { postId } = req.params;
		// fetch post in database and send to client
		const post = await Post.findById(postId);
		res.status(200).json(post);
	} catch (error: any) {
		// if have an error send a message as error.message to client
		res.status(404).json({ message: error.message });
	}
}
