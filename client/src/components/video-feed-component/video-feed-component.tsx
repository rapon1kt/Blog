"use client";
import moment from "moment";
import {
	Badge,
	Box,
	Button,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Video } from "@/models";
import ReactPlayer from "react-player";
import { ArrowDown, MessageCircle } from "lucide-react";

export default function VideoFeedComponent({ video }: { video: Video }) {
	const timeAgo = moment(video.createdAt).fromNow();

	const theme = useTheme();

	const isMediumRadio = useMediaQuery("(max-width:1200px)");
	const isSmallRadio = useMediaQuery("(max-width:600px)");

	const alternative = theme.palette.mode === "dark" ? "white" : "black";

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					xs: "column",
					md: "row",
				},
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				py: 4,
				px: 4,
				gap: 2,
			}}
		>
			<ReactPlayer
				url={`/assets/videos/${video.url}`}
				width={isMediumRadio ? "100%" : "80%"}
				style={{
					backgroundColor: "black",
					borderRadius: 12,
					outline: "1px solid white",
				}}
			/>
			<Stack
				sx={{
					py: 2.5,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "start",
					width: {
						lg: "60%",
						md: "80%",
						xs: "100%",
					},
				}}
			>
				<Typography variant="h5" color="text.primary">
					{video?.title}
				</Typography>
				<Typography variant="body2" color="alternative" gutterBottom>
					Publicado há {timeAgo}
				</Typography>
				<Typography color="text.primary" variant="h6">
					Descrição:{" "}
				</Typography>
				<Typography color="text.secondary" variant="subtitle1">
					{video?.description}
				</Typography>
				<Stack
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: 2,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Badge
						badgeContent={video.comments.length}
						sx={{ color: "alternative", my: 2 }}
						showZero
					>
						<MessageCircle color={alternative} />
					</Badge>
					<Typography color="text.secondary" variant="subtitle1">
						Veja o que estão comentando sobre aqui
					</Typography>
					<ArrowDown color={alternative} />
				</Stack>

				<Button
					sx={{ bgcolor: "background.paper" }}
					fullWidth
					LinkComponent="a"
					href={`/v1/feed/videos/${video._id}`}
				>
					Ver vídeo
				</Button>
			</Stack>
		</Box>
	);
}
