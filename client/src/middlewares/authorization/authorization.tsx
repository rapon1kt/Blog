"use client";
import { User } from "@/models";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import { AlertTriangleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Authorization({
	user,
	token,
	Children,
}: {
	user: User;
	token: string;
	Children: any;
}) {
	const router = useRouter();
	const theme = useTheme();

	if (!user && !token) {
		setTimeout(() => router.push("/login"), 1500);
		return (
			<Box
				sx={{
					height: "100vh",
					width: "100vw",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					bgcolor: "background.paper",
					textAlign: "center",
				}}
			>
				<AlertTriangleIcon
					size={60}
					style={{
						color: theme.palette.warning.main,
						marginInline: 3,
					}}
				/>
				<Typography
					color={theme.palette.warning.main}
					variant="h2"
					component="h1"
					gutterBottom
				>
					Não Autorizado!
				</Typography>
				<img
					src="/assets/401-error.png"
					alt="error"
					width="400px"
					height="400px"
				/>
			</Box>
		);
	} else {
		return Children;
	}
}
