import mongoose from "mongoose";
import { userSchema } from "../user/user";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			max: 1500,
		},
		comments: {
			type: Array,
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
		owner: userSchema,
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
