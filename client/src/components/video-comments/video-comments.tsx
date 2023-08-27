"use client";
import { User, Video } from "@/models";
import {
	Avatar,
	Box,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { MessageCircle, Send } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function VideoComments({
	video,
	token,
	user,
}: {
	video: Video;
	token: string;
	user: User;
}) {
	const [comment, setComment] = useState("");
	const [message, setMessage] = useState("");

	const sendComment = async () => {
		try {
			const publishedComment = await fetch(
				`http://localhost:2007/videos/${video._id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						owner: {
							_id: user._id,
							name: user.name,
							avatar_url: user.avatar_url,
							role: user.role,
						},
						text: comment,
					}),
				}
			);
			const response = await publishedComment.json();
			setMessage(response.message);
			const date = new Date();
			video.comments.push({
				owner: {
					_id: user._id,
					name: user.name,
					avatar_url: user.avatar_url,
					role: user.role,
				},
				text: comment,
				createdAt: date,
				updatedAt: date,
			});
		} catch (error) {
			setMessage("Algo de errado aconteceu!");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: {
					xs: "center",
					sm: "start",
				},
				padding: "2.5rem",
				width: "100%",
			}}
		>
			<Typography
				variant="h4"
				color="text.primary"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 0.5,
				}}
				fontWeight={800}
				gutterBottom
			>
				<MessageCircle size={40} strokeWidth={3} />
				Comentários
			</Typography>
			{video.comments[0] && (
				<Typography variant="subtitle1" gutterBottom color="text.secondary">
					Aqui serão mostrados os comentários deste vídeo!
				</Typography>
			)}
			{!video.comments[0] && (
				<Typography variant="subtitle1" gutterBottom color="text.secondary">
					Parece que este vídeo ainda não possue comentários, seja o primeiro a
					comentar sobre!
				</Typography>
			)}
			{message && (
				<Typography
					variant="body1"
					color="alternative"
					fontWeight={600}
					gutterBottom
				>
					{message}
				</Typography>
			)}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "row",
					justifyContent: "center",
					width: "100%",
					bgcolor: "background.paper",
					borderRadius: 2,
					p: 2,
					my: 2,
				}}
			>
				<Avatar
					sx={{
						width: 70,
						height: 70,
						mr: 1,
						display: {
							xs: "none",
							sm: "block",
						},
					}}
					src={`/assets/users/${user.avatar_url}`}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						width: {
							xs: "100%",
							lg: "50%",
						},
					}}
				>
					<TextField
						id="input-with-sx"
						label="Adicione um comentário!"
						variant="outlined"
						onChange={(e) => setComment(e.target.value)}
						sx={{ width: "90%" }}
					/>
					<IconButton onClick={sendComment} sx={{ color: "alternative" }}>
						<Send size={30} />
					</IconButton>
				</Box>
			</Box>
			<Grid
				container
				gap={2}
				sx={{ display: "flex", justifyContent: "center" }}
			>
				{video.comments.map((comment) => (
					<Grid
						item
						sx={{
							display: "flex",
							flexDirection: {
								xs: "column",
								sm: "row",
							},
							alignItems: {
								xs: "center",
							},
							gap: 2,
							bgcolor: "background.paper",
							padding: 2,
							borderRadius: 2,
							width: {
								xs: "100%",
								md: "49%",
							},
						}}
					>
						<Avatar
							sx={{ width: 50, height: 50, border: "1px solid black" }}
							src={`/assets/users/${comment.owner.avatar_url}`}
						/>
						<Stack
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "start",
							}}
						>
							<Stack sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
								<Typography
									component="a"
									href={`/profile/${comment.owner._id}`}
									variant="subtitle2"
									color="alternative"
									fontWeight={600}
									sx={{ textDecoration: "none" }}
								>
									{comment.owner.name}
								</Typography>
								<Typography variant="body2" color="text.primary">
									- {moment(comment.createdAt).fromNow()}
								</Typography>
							</Stack>
							<Typography variant="body2" color="text.secondary">
								{comment.text}
							</Typography>
						</Stack>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
