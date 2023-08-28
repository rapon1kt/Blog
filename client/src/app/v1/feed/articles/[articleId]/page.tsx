"use client";
import { Footer, Navbar } from "@/components";
import ArticleComments from "@/components/article-comments/article-comments";
import { Authorization } from "@/middlewares";
import { Post, User } from "@/models";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { Paperclip } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ArticleIdPageContainer({
	token,
	articleId,
	user,
}: {
	token: string;
	articleId: string;
	user: User;
}) {
	const [article, setArticle] = useState<Post>();
	const [owner, setOwner] = useState<User>();

	const isMobileWithoutImage = useMediaQuery("(max-width:1200px)");
	const isMobile = useMediaQuery("(max-width:900px)");

	const router = useRouter();

	useEffect(() => {
		const getArticle = async () => {
			await fetch(`http://localhost:2007/posts/${articleId}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			})
				.then((res) => res.json())
				.then(async (article) => {
					setArticle(article);
					await fetch(`http://localhost:2007/users/${article.owner}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					})
						.then((res) => res.json())
						.then((res) => {
							setOwner(res);
						});
				});
		};
		getArticle();
	}, []);

	const timeAgo = moment(article?.createdAt).fromNow();

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
			<Stack
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: {
							xs: "column",
							lg: "row",
						},
						gap: "1rem",
						mb: 4,
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					{!isMobileWithoutImage ? (
						<Stack
							sx={{
								p: {
									sm: "2.5rem",
									xs: "1rem",
								},
								width: {
									lg: "50%",
									md: "50%",
								},
								display: "flex",
								flexDirection: "column",
								textAlign: "justify",
							}}
						>
							<Typography
								variant="h3"
								color="text.primary"
								fontWeight={600}
								gutterBottom
							>
								{article?.title}
							</Typography>
							<Typography
								variant="body1"
								color="alternative"
								fontWeight={600}
								gutterBottom
							>
								Publicado há {timeAgo} por {owner?.name}
							</Typography>

							<Typography color="text.secondary" variant="h6" gutterBottom>
								{article?.description}
							</Typography>
							<Typography
								component="a"
								href={`/assets/posts/${article?.archivePath}`}
								download={article?.title}
								target="_blank"
								color="alternative"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 0.2,
									textDecoration: "none",
								}}
								variant="body2"
								gutterBottom
							>
								<Paperclip />
								Baixe o PDF completo do artigo: {article?.title}.pdf
							</Typography>
						</Stack>
					) : (
						<Stack
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								textAlign: "justify",
								gap: "2rem",
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									textAlign: "justify",
									p: 2.5,
								}}
							>
								<Typography
									variant="h4"
									color="text.primary"
									fontWeight={600}
									gutterBottom
								>
									{article?.title}
								</Typography>

								<Typography variant="body2" color="alternative" gutterBottom>
									Publicado há {timeAgo} por {owner?.name}
								</Typography>
								{isMobile && (
									<img
										src={`/assets/posts/${article?.picturesPaths}`}
										style={{
											width: 300,
											height: 400,
											borderRadius: "8px",
											boxShadow: "inherit",
										}}
									/>
								)}
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Typography
										color="text.secondary"
										variant="subtitle1"
										gutterBottom
										sx={{ mt: 1 }}
									>
										{article?.description}
									</Typography>
									<Typography
										component="a"
										href={`/assets/posts/${article?.archivePath}`}
										download={article?.title}
										target="_blank"
										color="alternative"
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 0.2,
											textDecoration: "none",
										}}
										variant="body2"
										gutterBottom
									>
										<Paperclip />
										Baixe o PDF completo do artigo: {article?.title}.pdf
									</Typography>
								</Box>
							</Box>
							{!isMobile && (
								<img
									src={`/assets/posts/${article?.picturesPaths}`}
									style={{
										width: 300,
										height: 400,
										borderRadius: "8px",
										boxShadow: "inherit",
									}}
								/>
							)}
						</Stack>
					)}
					{!isMobileWithoutImage && (
						<img
							src={`/assets/posts/${article?.picturesPaths}`}
							style={{ width: 400, height: 500, borderRadius: "8px" }}
						/>
					)}
				</Box>
				{article && (
					<ArticleComments post={article} token={token} user={user} />
				)}
			</Stack>
			<Footer />
		</Box>
	);
}

export default function ArticleIdPage({
	params,
}: {
	params: { articleId: string };
}) {
	const token = useSelector((state: any) => state.token);
	const user = useSelector((state: any) => state.user);

	return Authorization({
		token,
		user,
		Children: (
			<ArticleIdPageContainer
				token={token}
				articleId={params.articleId}
				user={user}
			/>
		),
	});
}
