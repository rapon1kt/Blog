"use client";
import { Box, Link, Typography } from "@mui/joy";
import { EventRepeat, GitHub, Warning } from "@mui/icons-material";

export default function Main() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				height: "100vh",
				pt: "5rem",
				background: (theme) => theme.palette.background.body,
			}}
		>
			<Warning color="warning" sx={{ fontSize: "300px" }} />
			<Typography
				level="title-lg"
				color="neutral"
				startDecorator={<EventRepeat />}
				fontFamily="Josefin Sans"
				gutterBottom
			>
				Oh sorry! This site is being rebuilt!
			</Typography>
			<Typography
				sx={{ gap: 0.3 }}
				color="neutral"
				level="body-xs"
				startDecorator={<GitHub />}
			>
				Check
				<Link color="danger" href="https://github.com/rapon1kt/Blog">
					Github
				</Link>
				to more informations.
			</Typography>
		</Box>
	);
}
