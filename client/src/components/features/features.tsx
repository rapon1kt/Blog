"use client";
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { BadgeCheck, PersonStanding, Rocket } from "lucide-react";

export default function Features() {
	const mediumSize = useMediaQuery("(min-width: 1300px)");

	return (
		<Box
			sx={{
				bgcolor: "background.paper",
				textAlign: "center",
				p: 5,
				display: "flex",
				alignItems: "center",
				flexDirection: mediumSize ? "row" : "column",
			}}
		>
			<Stack>
				<Typography
					variant="h4"
					color="text.primary"
					gutterBottom
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					O que podemos te oferecer?
				</Typography>
				{mediumSize && (
					<img
						src="/assets/attached2.png"
						alt="picture"
						width={500}
						height={500}
					/>
				)}
			</Stack>
			<Box
				my={5}
				sx={{
					gap: 3,
					width: {
						md: "80%",
						xs: "100%",
					},
				}}
			>
				<Stack
					sx={{
						display: "flex",
						flexDirection: {
							xs: "column",
							md: "row",
						},
						gap: 3,
					}}
				>
					<Box
						sx={{
							padding: "3rem",
							bgcolor: "background.default",
							borderRadius: "4px",
							width: {
								xs: "100%",
								md: "50%",
							},
						}}
					>
						<Typography
							variant="h5"
							color="text.primary"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							gutterBottom
						>
							<Rocket color="#F56565" style={{ marginInline: 5 }} />
							Visão de futuro
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							Nossa visão é que o Empreews se torne um catalisador para a
							disseminação de conhecimento, estimulando a colaboração entre
							jovens cientistas empreendedores e inspirando a próxima geração de
							líderes nas mais diversas áreas do saber.
						</Typography>
					</Box>
					<Box
						sx={{
							padding: "3rem",
							bgcolor: "background.default",
							borderRadius: "4px",
							width: {
								xs: "100%",
								md: "50%",
							},
						}}
					>
						<Typography
							variant="h5"
							color="text.primary"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							gutterBottom
						>
							<PersonStanding color="#F56565" style={{ marginInline: 5 }} />
							Facilidade
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							Através de uma abordagem intuitiva e amigável, os jovens
							pesquisadores podem apresentar suas pesquisas, metodologias e
							descobertas de maneira organizada e profissional.
						</Typography>
					</Box>
				</Stack>
				<Box
					sx={{
						padding: "3rem",
						bgcolor: "background.default",
						borderRadius: "4px",
						mt: 3,
					}}
				>
					<Typography
						variant="h5"
						color="text.primary"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						gutterBottom
					>
						<BadgeCheck color="#F56565" style={{ marginInline: 5 }} />
						Compromisso
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						No Empreews, valorizamos a autenticidade e a originalidade. Estamos
						empenhados em proporcionar um espaço seguro e inclusivo onde jovens
						de diversas origens possam compartilhar suas perspectivas únicas e
						contribuir para o diálogo científico. Através do rigor científico e
						do comprometimento com a excelência, buscamos elevar a qualidade das
						discussões científicas entre os jovens e além.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
