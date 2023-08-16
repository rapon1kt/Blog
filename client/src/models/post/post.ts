import Comments from "../comments/comments";

export default interface Post {
	_id: string;
	title: string;
	description: string;
	createdAt: Date;
	comments?: Array<Comments>;
	picturesPaths?: Array<string>;
	archivePath?: string;
	owner: String;
}
