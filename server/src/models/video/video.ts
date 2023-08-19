import mongoose from "mongoose";
import commentsSchema from "../comments/comments";

export const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			optional: true,
		},
		url: {
			type: String,
			optional: true,
			default: "",
		},
		thumbnail: {
			type: String,
			optional: true,
			default: "",
		},
		comments: {
			type: [commentsSchema],
			optional: true,
			default: [],
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
