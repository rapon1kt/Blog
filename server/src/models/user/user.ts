import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
			required: false,
			default: "",
		},
		birthday: {
			type: Date,
			required: true,
		},
		registration: {
			type: Number,
			required: false,
		},
		grade: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
