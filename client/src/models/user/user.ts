export default interface User {
	_id: string;
	name: string;
	email: string;
	password: string;
	avatar_url?: string;
	createdAt: Date;
	birthday: Date;
	registration?: number;
	grade?: string;
	role: string;
}
