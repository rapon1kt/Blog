export default async function getUser({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) {
	const response = await fetch(`http://localhost:2007/users/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const user = await response.json();
	return JSON.stringify(user, null, 2);
}
