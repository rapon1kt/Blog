"use client";
import { useTheme, Typography, IconButton, Stack } from "@mui/material";
import { User } from "@/models";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoVideos({
	userId,
	user,
}: {
	userId: string;
	user: User;
}) {
	const theme = useTheme();
	const router = useRouter();

	return (
		<>
			<Typography variant="subtitle1" color="text.secondary">
				{userId === user._id ? (
					<Stack
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						Parece que você ainda não possui videos, adicione um!
						<IconButton
							onClick={() => router.push(`/v1/videos/new/${user._id}`)}
						>
							<Plus />
						</IconButton>
					</Stack>
				) : (
					"Ops! Aparentemente este usuário não possui videos..."
				)}
			</Typography>
			<img
				style={{
					width: "350px",
					height: "350px",
				}}
				src={
					theme.palette.mode === "dark"
						? "/assets/not-found-dark.png"
						: "/assets/not-found-light.png"
				}
				alt="Video"
			/>
		</>
	);
}
