import Comments from "../comments/comments";

export default interface Video {
	_id: string;
	title: string;
	description: string;
	url: string;
	thumbnail: string;
	owner: string;
	comments: Array<Comments>;
	createdAt: Date;
	updatedAt: Date;
}
