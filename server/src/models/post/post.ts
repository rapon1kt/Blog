import commentsSchema from "../comments/comments";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			max: 300,
		},
		comments: {
			type: [commentsSchema],
			optional: true,
			default: [],
		},
		picturesPaths: {
			type: Array,
			optional: true,
			default: [],
		},
		archivePath: {
			type: String,
			optional: true,
			default: "",
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
