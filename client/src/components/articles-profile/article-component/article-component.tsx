import { Post } from "@/models";
import { Avatar, Box,  Stack, Typography } from "@mui/material";

export default function ArticleComponent({ post }: { post: Post }) {
	return (
		<Box
			sx={{
				width: {
					sm: "80%",
					xs: "100%",
				},
				my: 4,
			}}
		>
			<Stack
				sx={{
					display: "flex",
					flexDirection: {
						xs: "column",
						sm: "row",
					},
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Avatar
					src={`/assets/posts/${post.picturesPaths![0]}`}
					alt={post.title}
					sx={{
						width: 150,
						height: 150,
					}}
				/>
				<Box sx={{ p: 1 }}>
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							textAlign: "center",
							gap: 1,
						}}
					>
						<Typography variant="h5" color="text.primary">
							{post.title} -
						</Typography>
						<Typography variant="subtitle1" color="alternative">
							{new Date(post.createdAt).toLocaleDateString()}
						</Typography>
					</Stack>
					<Typography variant="body1" color="text.secondary">
						{post.description}
					</Typography>
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							color: "text.secondary",
							gap: 1,
						}}
					>
						<Typography variant="body2" color="text.primary">
							Baixar o PDF para leitura completa do projeto:
						</Typography>
						<Typography
							component="a"
							href={`/assets/posts/${post.archivePath}`}
							download={post.title}
							target="_blank"
							sx={{ color: "alternative", textDecoration: "none" }}
						>
							{post.title}.pdf
						</Typography>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
}
