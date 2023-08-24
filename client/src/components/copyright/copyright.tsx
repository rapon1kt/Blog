"use client";
import { Typography, Link, SxProps, Container, useTheme } from "@mui/material";
import { Heart } from "lucide-react";

export default function Copyright({ props }: { props?: SxProps }) {
	const theme = useTheme();

	const alternative = theme.palette.mode === "light" ? "#407BFF" : "#F56565";

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				mt: 5,
				...props,
			}}
		>
			<Typography
				variant="subtitle1"
				color="text.primary"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 1,
				}}
				gutterBottom
			>
				Made with <Heart color={alternative} size={18} /> by{" "}
				<Link
					href="https://instagram.com/raponi_13"
					style={{ color: alternative, textDecoration: "none" }}
				>
					rapon1kt
				</Link>
			</Typography>
		</Container>
	);
}
