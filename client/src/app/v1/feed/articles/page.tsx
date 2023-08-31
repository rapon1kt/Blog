"use client";
import { Footer, Navbar, ArticleFeedComponent } from "@/components";
import { Suspense, useEffect, useState } from "react";
import { Authorization } from "@/middlewares";
import { useSelector } from "react-redux";
import { Post, User } from "@/models";
import { Box } from "@mui/material";

function ArticleFeedContainer({ token, user }: { token: string; user: User }) {
	const [articles, setArticles] = useState<Post[]>();

	useEffect(() => {
		const getArticle = async () => {
			await fetch("http://localhost:2007/posts", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((articles) => setArticles(articles));
		};
		getArticle();
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "background.default",
				flexDirection: "column",
				gap: "5rem",
			}}
		>
			<Navbar isCover={false} user={user} token={token} />
			{articles &&
				articles.map((article) => (
					<Suspense fallback={<h1>Carregando...</h1>}>
						<ArticleFeedComponent article={article} token={token} />
					</Suspense>
				))}
			<Footer />
		</Box>
	);
}

export default function ArticleFeed() {
	const token = useSelector((state: any) => state.token);
	const user = useSelector((state: any) => state.user);

	return Authorization({
		token,
		user,
		Children: <ArticleFeedContainer token={token} user={user} />,
	});
}
