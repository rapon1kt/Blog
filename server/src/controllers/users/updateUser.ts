import { Response, Request } from "express";
import { User } from "../../models";

export default async function updateUser(req: Request, res: Response) {
	try {
		// get the user id that will be updated
		const { id } = req.params;
		// get information from client request that will be updated
		const { registration, grade, role } = req.body;
		const update = req.file;
		// find the user with id provided and update these informations
		const updatedUser = await User.findByIdAndUpdate(id, {
			avatar_url: update?.filename,
			registration,
			grade,
			role,
		});
		// if user is not found return 404 status code and an message
		if (!updatedUser) return res.status(404).json(updatedUser);
		// else, save user and send a success message to client
		const savedUser = await updatedUser.save();
		res
			.status(200)
			.json({ message: "The user has been updated successfully.", savedUser });
	} catch (error: any) {
		// if have an server error return an message as error.message
		res.status(500).json({ message: error.message });
	}
}
