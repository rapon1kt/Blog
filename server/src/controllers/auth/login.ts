import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export default async function login(req: Request, res: Response) {
	try {
		// get email and password provided by client
		const { email, password } = req.body;

		// verify if user exist, if user does not exist return an error
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: "User does not exist." });

		// comparison of the password provided by the client with the database password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ msg: "The password is incorrect." });

		// if everything is correct we create a login token for this user
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

		// we delete the password that will now no longer be used and send the token and user to the client
		delete user.password;
		res.status(200).json({ token, user });
	} catch (error: any) {
		// if there is any error not related to the previous conditions, it will be sent to the client
		res.status(500).json(error.message);
	}
}
