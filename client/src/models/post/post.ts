import User from "../user/user";

export default interface Post {
	_id: string;
	title: string;
	description: string;
	createdAt: Date;
	comments?: Array<string>;
	picturesPaths?: Array<string>;
	archivePath?: string;
	owner: String;
}
