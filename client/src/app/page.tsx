"use client";
import { Suspense } from "react";
import { Check, NewspaperIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MainPostsSkeleton, MainPosts, Navbar, Features } from "@/components";
import {
	useMediaQuery,
	Container,
	Typography,
	Box,
	Stack,
	Button,
} from "@mui/material";

export default function Main() {
	const mobile = useMediaQuery("(max-width:500px)");
	const { user, token } = useSelector((state: any) => state);
	const router = useRouter();

	return (
		<Box>
			<Navbar user={user} token={token} />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					bgcolor: "background.paper",
					mt: 6,
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h3"
						align="center"
						color="text.primary"
						sx={{
							display: "flex",
							alignItems: "center",
							fontSize: {
								xs: 40,
								sm: 48,
								md: 50,
								lg: 50,
							},
						}}
						gutterBottom
					>
						{!mobile && (
							<NewspaperIcon
								style={{ color: "#F56565", marginInline: "1rem" }}
								size={80}
							/>
						)}
						Empreender News
					</Typography>
					<Typography
						variant="h6"
						align="center"
						color="text.secondary"
						paragraph
					>
						Bem-vindo ao nosso site de divulgação de artigos científicos
						escolares! Acreditamos que ao fornecer um espaço para compartilhar
						essas descobertas, estamos promovendo o interesse pela ciência desde
						cedo, incentivando a curiosidade e inspirando futuras gerações de
						cientistas. Explore nosso catálogo de artigos e maravilhe-se com as
						ideias e conquistas impressionantes de estudantes apaixonados por
						conhecimento.
					</Typography>
					{!token ? (
						<Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button
								variant="contained"
								sx={{ bgcolor: "alternative", color: "text.primary" }}
								fullWidth
								href="/login"
							>
								Login
							</Button>
							<Button variant="outlined" fullWidth href="/register">
								Registrar-me
							</Button>
						</Stack>
					) : (
						<Button
							variant="contained"
							sx={{ bgcolor: "alternative", color: "text.primary" }}
							fullWidth
							href="/home"
						>
							Bem-vindo de volta, {user.name}!
						</Button>
					)}
				</Container>
				<Box
					sx={{
						display: { lg: "block", xs: "none" },
						width: "30rem",
						height: "30rem",
						mr: "5rem",
					}}
				>
					<img
						src="/assets/attached1.png"
						alt="image"
						width="100%"
						height="100%"
					/>
				</Box>
			</Box>
			<Features />

			<Box sx={{ bgcolor: "background.default" }} py={6}>
				<Typography
					variant="h4"
					component="h2"
					textAlign="center"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					color="text.primary"
				>
					<Check color="#F56565" size={60} />
					Alguns Projetos:
				</Typography>
				<Typography
					variant="h6"
					align="center"
					color="text.secondary"
					paragraph
					gutterBottom
				>
					Aqui estão os últimos projetos publicados no nosso site, para ver
					todos os artigos publicados{" "}
					<Typography
						variant="h6"
						color="alternative"
						component="a"
						href="/login"
					>
						entre
					</Typography>{" "}
					e junte-se à nós!
				</Typography>
				<Suspense fallback={<MainPostsSkeleton />}>
					<MainPosts token={token} router={router} />
				</Suspense>
			</Box>
		</Box>
	);
}
