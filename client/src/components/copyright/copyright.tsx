import { Typography, Link, SxProps } from "@mui/material";

export default function Copyright({ props }: { props?: SxProps }) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			display="flex"
			alignItems="center"
			justifyContent="center"
			align="center"
			sx={props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://colegioempreender.com.br">
				Colégio Empreender
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
