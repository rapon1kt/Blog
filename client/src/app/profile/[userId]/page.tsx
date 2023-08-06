"use client";
import { getUser } from "@/components";
import { Suspense } from "react";
import { useSelector } from "react-redux";

export default function Profile({ params }: { params: { userId: string } }) {
	const token = useSelector((state: any) => state.token);
	const userId = params.userId;
	const newUser = getUser({ userId, token });

	return (
		<Suspense fallback={<h1>Carregando...</h1>}>
			<pre>{newUser}</pre>
		</Suspense>
	);
}
