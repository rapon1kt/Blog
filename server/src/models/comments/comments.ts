import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	name: String,
	avatar_url: String,
	role: String,
});

const commentsSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		owner: OwnerSchema,
	},
	{ timestamps: true }
);

export default commentsSchema;
