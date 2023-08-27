"use client";
import { Footer, Navbar, VideoComments } from "@/components";
import { Authorization } from "@/middlewares";
import { User, Video } from "@/models";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import moment from "moment";

function VideoPageContainer({
	videoId,
	token,
	user,
}: {
	videoId: string;
	token: string;
	user: User;
}) {
	const [video, setVideo] = useState<Video>();
	const [owner, setOwner] = useState<User>();

	const router = useRouter();

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
				.then(async (res: Video) => {
					setVideo(res);
					await fetch(`http://localhost:2007/users/${res.owner}`, {
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
		getVideo();
	}, []);

	const timeAgo = moment(video?.createdAt).fromNow();

	return (
		<Box
			sx={{
				bgcolor: "background.default",
			}}
		>
			<Navbar isCover={false} user={user} token={token} />
			<Box
				mt="4rem"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "space-around",
					bgcolor: "background.paper",
				}}
			>
				<Box
					sx={{
						textAlign: "start",
						borderRadius: "12px",
						width: "100%",
						gap: 1,
						p: 1,
					}}
				>
					<ReactPlayer
						controls
						url={`/assets/videos/${video?.url}`}
						width="100%"
						height="70vh"
						style={{ backgroundColor: "black" }}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: {
							xs: "column",
							lg: "row",
						},
						gap: "1rem",
					}}
				>
					<Stack
						sx={{
							p: {
								sm: "2.5rem",
								xs: "1rem",
							},
							width: {
								lg: "60%",
							},
							display: "flex",
							flexDirection: "column",
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
					</Stack>
					<Stack
						sx={{
							p: "2.5rem",
							width: {
								xs: "100%",
								lg: "60%",
							},
							display: "flex",
							flexDirection: {
								xs: "column",
								sm: "row",
							},
							alignItems: {
								xs: "center",
							},
							gap: "1rem",
						}}
					>
						{owner ? (
							<>
								<Avatar
									src={`/assets/users/${owner?.avatar_url}`}
									alt={owner?.name}
									sx={{
										width: {
											sm: 200,
											xs: 250,
										},
										height: {
											sm: 200,
											xs: 250,
										},
									}}
								/>
								<Stack>
									<Typography variant="h6" color="text.primary">
										{owner?.name} - {owner?.role} do {owner?.grade}
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										gutterBottom
									>
										Se interessou pela forma como o vídeo foi feito por{" "}
										{owner?.name}? Entre em seu perfil e confira novos vídeos ou
										compartilhe esse vídeo com seus colegas!
									</Typography>
									<Stack
										sx={{
											gap: "1rem",
											display: "flex",
											flexDirection: {
												xs: "column",
												sm: "row",
											},
										}}
									>
										<Button
											sx={{
												color: "white",
												bgcolor: "alternative",
												width: {
													xs: "100%",
													sm: "50%",
												},
											}}
											onClick={() => router.push(`/profile/${owner?._id}`)}
										>
											Ver perfil
										</Button>
										<Button
											sx={{
												color: "white",
												bgcolor: "#0a3d8f",
												width: {
													xs: "100%",
													sm: "50%",
												},
											}}
											onClick={() => {
												navigator.clipboard.writeText(window.location.href);
											}}
										>
											Copiar link do vídeo
										</Button>
									</Stack>
								</Stack>
							</>
						) : (
							<h1>carregando...</h1>
						)}
					</Stack>
				</Box>
			</Box>
			{video && <VideoComments token={token} user={user} video={video} />}
			<Footer />
		</Box>
	);
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
	const token = useSelector((state: { token: string }) => state.token);
	const user = useSelector((state: { user: User }) => state.user);

	return Authorization({
		Children: (
			<VideoPageContainer videoId={params.videoId} token={token} user={user} />
		),
		token,
		user,
	});
}
