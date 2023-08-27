export default interface Comments {
	text: string;
	owner: {
		_id: string;
		name: string;
		avatar_url?: string;
		role: string;
	};
	createdAt: Date;
	updatedAt: Date;
}
