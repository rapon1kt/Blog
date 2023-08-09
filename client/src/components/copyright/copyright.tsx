"use client";
import {
	Typography,
	Link,
	SxProps,
	Stack,
	Container,
	useTheme,
} from "@mui/material";
import { Heart, Instagram } from "lucide-react";

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
			<Stack>
				<Typography variant="subtitle1" color="text.secondary">
					{"Copyright © "}
					<Link
						href="https://colegioempreender.com.br"
						sx={{ textDecoration: "none", color: "alternative" }}
					>
						Colégio Empreender
					</Link>{" "}
					{new Date().getFullYear()}
					{"."}
				</Typography>
			</Stack>
			<Stack>
				<Typography
					variant="subtitle1"
					color="text.primary"
					sx={{ dislay: "flex", alinItems: "center", justifyContent: "center" }}
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
			</Stack>
		</Container>
	);
}
