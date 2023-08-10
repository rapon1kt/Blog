"use client";
import { Authorization } from "@/middlewares";
import { useSelector } from "react-redux";

function HomeContainer() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default function Home() {
	const { user, token } = useSelector((state: any) => state);
	return Authorization({ Children: HomeContainer, token, user });
}
