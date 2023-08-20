import { Post } from "@/models";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Button,
	CardActions,
} from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function MainPosts({
	token,
	router,
	latestPosts,
}: {
	token: string;
	router: AppRouterInstance;
	latestPosts: Post[];
}) {
	return (
		<Grid
			container
			spacing={5}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				mt: 5,
				px: {
					md: 10,
					xs: 5,
				},
			}}
		>
			{latestPosts.map((post: Post) => (
				<Grid item key={post._id} xs={12} md={4}>
					<Card
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<CardMedia
							component="div"
							sx={{
								pt: "56.25%",
							}}
							image={`/assets/posts/${post.picturesPaths![0]}`}
						/>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography gutterBottom variant="h5" component="h2">
								{post.title} - {new Date(post.createdAt).toLocaleDateString()}
							</Typography>
							<Typography>{post.description}</Typography>
						</CardContent>
						{token ? (
							<CardActions>
								<Button
									size="small"
									onClick={() => router.push(`/posts/${post._id}`)}
									sx={{ color: "alternative" }}
								>
									Veja o artigo completo, aqui!
								</Button>
							</CardActions>
						) : (
							<CardActions>
								<Button
									size="small"
									onClick={() => router.push("/login")}
									sx={{ color: "alternative" }}
								>
									Faça login para ver o conteúdo!
								</Button>
							</CardActions>
						)}
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
