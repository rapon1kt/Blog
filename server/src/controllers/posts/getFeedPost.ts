import { Response, Request } from "express";
import { Post } from "../../models";

export default async function getFeedPosts(res: Response, req: Request) {
	try {
		// fetch posts in database and send to client
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error: any) {
		// if no posts are found send a message as error.message
		res.status(404).json({ message: error.message });
	}
}
