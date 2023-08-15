import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		owner: mongoose.Types.ObjectId,
	},
	{ timestamps: true }
);

export default commentsSchema;
