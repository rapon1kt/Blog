import { User, Video } from "@/models";
import { Box, Stack } from "@mui/material";
import NoVideos from "./no-video/no-videos";
import VideoComponent from "./video-component/video-component";

export default function VideosProfile({
	videos,
	user,
	userId,
}: {
	videos: Video[];
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
			{videos.map((video: Video) => (
				<Stack
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "start",
					}}
				>
					<VideoComponent key={video._id} video={video} />
				</Stack>
			))}
			{videos.length === 0 && <NoVideos user={user} userId={userId} />}
		</Box>
	);
}
