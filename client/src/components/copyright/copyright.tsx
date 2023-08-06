import { Typography, Link, SxProps, Stack, Container } from "@mui/material";
import { Heart, Instagram } from "lucide-react";

export default function Copyright({ props }: { props?: SxProps }) {
	return (
		<Container maxWidth="lg" sx={props}>
			<Stack>
				<Typography variant="subtitle1" color="text.primary">
					{"Copyright © "}
					<Link href="https://colegioempreender.com.br">
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
					Made with <Heart color="#F56565" size={18} /> by{" "}
					<Link
						href="https://instagram.com/raponi_13"
						style={{ color: "#F56565", textDecoration: "none" }}
					>
						rapon1kt
					</Link>
				</Typography>
			</Stack>
		</Container>
	);
}
