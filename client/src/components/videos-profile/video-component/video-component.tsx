"use client";
import { Video } from "@/models";
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Stack,
	Badge,
	useTheme,
} from "@mui/material";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VideoComponent({ video }: { video: Video }) {
	const router = useRouter();
	const theme = useTheme();

	const alternative = theme.palette.mode === "dark" ? "white" : "black";

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
			<Card
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: {
						xs: "column",
						lg: "row",
					},
					alignItems: {
						xs: "center",
					},
					padding: "1rem",
					bgcolor: "background.paper",
				}}
			>
				<CardMedia
					component="img"
					src={`/assets/videos/${video.thumbnail}`}
					sx={{
						width: {
							xs: 300,
							sm: 400,
							md: 500,
							lg: 300,
						},
						height: 300,
						borderRadius: "12px",
					}}
				/>
				<Stack sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent>
						<Stack
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								textAlign: "start",
								gap: 0.5,
							}}
						>
							<Typography gutterBottom variant="h6" component="div">
								{video.title}
							</Typography>
							-
							<Typography variant="subtitle1" color="alternative">
								{new Date(video.createdAt).toLocaleDateString()}
							</Typography>
						</Stack>
						<Typography variant="body2" color="text.secondary">
							{video.description}
						</Typography>
					</CardContent>
					<CardContent
						sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
					>
						<Badge
							badgeContent={video.comments.length}
							sx={{ color: "alternative" }}
							showZero
						>
							<MessageCircle color={alternative} />
						</Badge>
						{video.comments.length === 0
							? "Seja o primeiro a comentar no vídeo!"
							: "Veja os comentários deste vídeo!"}
					</CardContent>
					<CardActions>
						<Button
							sx={{ color: "white", bgcolor: "alternative" }}
							fullWidth
							onClick={() => router.push(`/v1/feed/videos/${video._id}`)}
						>
							Acessar o video
						</Button>
					</CardActions>
				</Stack>
			</Card>
		</Box>
	);
}
