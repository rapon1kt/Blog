import { Post, User } from "@/models";
import { Box, Button, Typography } from "@mui/material";

export default async function ArticleFeedComponent({
	article,
	token,
}: {
	article: Post;
	token: string;
}) {
	const response = await fetch(`http://localhost:2007/users/${article.owner}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json",
		},
	});

	const user: User = await response.json();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				p: 2,
				gap: 1,
			}}
		>
			<Box
				sx={{
					gap: 2,
					borderRadius: 4,
					width: {
						xs: "100%",
						md: "40%",
					},
					height: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						justifyContent: "space-between",
					}}
				>
					<Typography color="alternative" variant="h4" gutterBottom>
						{article.title}
					</Typography>
					<Typography color="text.secondary" variant="subtitle1">
						{article.description}
					</Typography>
					<Button
						LinkComponent="a"
						href={`/v1/feed/articles/${article._id}`}
						fullWidth
						variant="contained"
						sx={{ bgcolor: "background.paper", color: "text.primary" }}
					>
						Ver artigo
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
