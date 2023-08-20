"use client";
import { useEffect, useState } from "react";
import { Check, NewspaperIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
	MainPostsSkeleton,
	MainPosts,
	Navbar,
	Features,
	Footer,
} from "@/components";
import {
	useMediaQuery,
	Container,
	Typography,
	Box,
	Stack,
	Button,
	useTheme,
} from "@mui/material";
import { Post } from "@/models";

export default function Main() {
	const mobile = useMediaQuery("(max-width:500px)");
	const user = useSelector((state: any) => state.user);
	const token = useSelector((state: any) => state.token);
	const router = useRouter();
	const theme = useTheme();

	const [latestPosts, setLatestPosts] = useState<Post[]>([]);

	useEffect(() => {
		const getLatestPosts = async () => {
			const response = await fetch("http://localhost:2007/posts", {
				method: "get",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
				},
			});

			const posts = await response.json();
			const latestPosts = [
				posts[posts.length - 1],
				posts[posts.length - 2],
				posts[posts.length - 3],
			];
			setLatestPosts(latestPosts);
		};

		getLatestPosts();
	}, []);

	const alternative = theme.palette.mode === "light" ? "#407BFF" : "#F56565";

	return (
		<Box>
			<Navbar user={user} token={token} isCover={true} />
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
								style={{ color: alternative, marginInline: "1rem" }}
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
							<Button
								variant="contained"
								sx={{ color: "text.primary", bgcolor: "background.default" }}
								fullWidth
								href="/register"
							>
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
						src={
							theme.palette.mode === "dark"
								? "/assets/attached1-dark.png"
								: "/assets/attached1-light.png"
						}
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
					<Check color={alternative} size={60} />
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
				{latestPosts.length > 3 ? (
					<MainPosts token={token} router={router} latestPosts={latestPosts} />
				) : (
					<MainPostsSkeleton />
				)}
			</Box>
			<Footer />
		</Box>
	);
}
