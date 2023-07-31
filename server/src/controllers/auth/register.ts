import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models";

export default async function register(req: Request, res: Response) {
	try {
		// get credentials provided by client
		const { name, email, password, birthday } = req.body;

		// generate salt to hashedPassword
		const genSalt = process.env.SALT;
		const salt = await bcrypt.genSalt(parseInt(genSalt!));

		// generate hashedPassword
		const passwordHash = await bcrypt.hash(password, salt);

		// create new user
		const newUser = new User({
			name,
			email,
			password: passwordHash,
			birthday,
		});

		// save newUser in database and return this user to client
		const user = await newUser.save();
		res.status(201).json(user);
	} catch (error: any) {
		// if there is an error in the registration process, an error.message will be sent to client
		res.status(500).json(error.message);
	}
}
