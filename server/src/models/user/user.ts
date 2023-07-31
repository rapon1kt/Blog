import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		avatar_url: {
			type: String,
			optional: true,
			default: "",
		},
		birthday: {
			type: Date,
			required: true,
		},
		registration: {
			type: Number,
			optional: true,
		},
		grade: {
			type: String,
			optional: true,
		},
		role: {
			type: String,
			optional: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
