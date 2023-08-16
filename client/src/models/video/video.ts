import Comments from "../comments/comments";

export default interface Video {
	title: String;
	description: String;
	url: String;
	comments: Array<Comments>;
	createdAt: Date;
	updatedAt: Date;
}
