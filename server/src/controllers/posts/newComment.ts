import { Request, Response } from "express";
import { Post } from "../../models";

export default async function newComment(req: Request, res: Response) {
	try {
		// get postId from request params
		const { postId } = req.params;
		// get text and owner of comment
		const { text, owner } = req.body;
		// find post with postId params
		const post = await Post.findById(postId);
		// push new comment to post
		post?.comments.push({ text, owner });
		// save and send comment
		const savedComment = await post?.save();
		res.status(201).json({
			savedComment,
			message: "Comentário publicado com sucesso!",
		});
	} catch (err: any) {
		// if have an server error return an message as error.message
		res.status(500).json({
			message: "Não foi possível publicar seu comentário.",
			error: err,
		});
	}
}
