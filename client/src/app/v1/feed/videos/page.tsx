"use client";
import React from "react";
import { Footer, Navbar, VideoFeedComponent } from "@/components";
import { Authorization } from "@/middlewares";
import { useSelector } from "react-redux";
import { User, Video } from "@/models";
import { Box } from "@mui/material";

function VideoFeedContainer({ user, token }: { user: User; token: string }) {
	const [videos, setVideos] = React.useState<Video[]>();

	React.useEffect(() => {
		const getVideos = async () => {
			await fetch("http://localhost:2007/videos", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((videos) => setVideos(videos));
		};
		getVideos();
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "background.default",
				flexDirection: "column",
				justifyContent: "center",
				gap: "5rem",
			}}
		>
			<Navbar isCover={false} user={user} token={token} />
			<Box
				sx={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
					gap: 2,
					alignItems: "center",
				}}
			>
				{videos && videos.map((video) => <VideoFeedComponent video={video} />)}
			</Box>
			<Footer />
		</Box>
	);
}

export default function VideoFeed() {
	const token = useSelector((state: any) => state.token);
	const user = useSelector((state: any) => state.user);

	return Authorization({
		token,
		user,
		Children: <VideoFeedContainer token={token} user={user} />,
	});
}
