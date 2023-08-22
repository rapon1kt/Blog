"use client";
import { Authorization } from "@/middlewares";
import { User, Video } from "@/models";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function VideoPageContainer({
	videoId,
	token,
}: {
	videoId: string;
	token: string;
}) {
	const [video, setVideo] = useState<Video>();

	useEffect(() => {
		const getVideo = async () => {
			await fetch(`http://localhost:2007/videos/${videoId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					setVideo(res);
				});
		};

		getVideo();
	}, []);

	return <h1>{video?.title}</h1>;
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
	const token = useSelector((state: { token: string }) => state.token);
	const user = useSelector((state: { user: User }) => state.user);

	return Authorization({
		Children: <VideoPageContainer videoId={params.videoId} token={token} />,
		token,
		user,
	});
}
