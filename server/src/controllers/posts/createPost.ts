import { Response, Request } from "express";
import { Post, User } from "../../models";

export default async function createPost(req: Request, res: Response) {
	try {
		// get informations from request
		const { userId } = req.params;
		const { title, description } = req.body;
		const uploads: any = req.files;
		// find the owner of the post
		const owner = await User.findById(userId);
		// filter the files of req.files
		const pictures = await uploads?.pictures.map(
			(picture: any) => picture.filename
		);
		const archive = uploads?.archive[0].filename;
		// create the new post
		const post = new Post({
			title,
			description,
			picturesPaths: pictures,
			archivePath: archive,
			owner,
		});
		const createdPost = await post.save();
		// send this post to client
		res.status(201).json(createdPost);
	} catch (error: any) {
		// if have an server error return an message as error.message
		res.status(409).json({ message: error.message });
	}
}
