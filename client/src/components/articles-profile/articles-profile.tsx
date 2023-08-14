import { Post, User } from "@/models";
import { Box, Stack } from "@mui/material";
import ArticleComponent from "./article-component/article-component";
import NoArticles from "./no-articles/no-articles";

export default function ArticlesProfile({
	posts,
	user,
	userId,
}: {
	posts: Post[];
	user: User;
	userId: string;
}) {
	return (
		<Box
			sx={{
				textAlign: "center",
				width: {
					lg: "60vw",
					md: "80vw",
					sm: "90vw",
					xs: "90vw",
				},
			}}
		>
			{posts.map((post: Post) => (
				<Stack
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "start",
					}}
				>
					<ArticleComponent key={post._id} post={post} />
				</Stack>
			))}
			{posts.length === 0 && <NoArticles user={user} userId={userId} />}
		</Box>
	);
}
