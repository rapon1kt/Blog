"use client";
import { Footer, Navbar } from "@/components";
import { Authorization } from "@/middlewares";
import { useSelector } from "react-redux";
import {
	Box,
	Button,
	Card,
	CardMedia,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import { User } from "@/models";
import { useRouter } from "next/navigation";
import { Camera, Scroll } from "lucide-react";

const cardsOptions = [
	{
		id: 1,
		title: "Artigos",
		description:
			"Veja os artigos científicos que foram desenvolvidos e publicados pelos alunos e professores do Colégio Empreender e Faculdade FACESM.",
		image: {
			light: "/assets/article-light.png",
			dark: "/assets/article-dark.png",
			alt: "articles image",
		},
		link: "/v1/feed/articles",
		icon: Scroll,
	},
	{
		id: 2,
		title: "Vídeos",
		description:
			"Veja entrevistas de alunos e professores a respeito do desempenho escolar em aspectos de progresso educacional e espectativas futuras para a educação dos novos jovens.",
		image: {
			light: "/assets/videos-light.png",
			dark: "/assets/videos-dark.png",
			alt: "videos image",
		},
		link: "/v1/feed/videos",
		icon: Camera,
	},
];

function HomeContainer({ user, token }: { user: User; token: string }) {
	const theme = useTheme();
	const router = useRouter();

	return (
		<Box sx={{ bgcolor: "background.default" }}>
			<Navbar user={user} token={token} isCover={false} />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: {
						xs: "column",
						md: "row",
					},
					justifyContent: "space-evenly",
					padding: 6,
					mt: 6,
					gap: 5,
				}}
			>
				{cardsOptions.map((card) => (
					<Card
						component={Grid}
						item
						key={card.id}
						sx={{
							bgcolor: "background.paper",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: {
								xs: 400,
								sm: 600,
							},
							height: 600,
							p: 5,
						}}
					>
						<CardMedia
							image={
								theme.palette.mode === "light"
									? card.image.light
									: card.image.dark
							}
							sx={{
								height: {
									xs: 300,
									sm: 400,
								},
								width: {
									xs: 300,
									sm: 400,
								},
							}}
							title={card.image.alt}
						/>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h4"
								color="alternative"
								sx={{ display: "flex", alignItems: "center" }}
							>
								<card.icon size={30} style={{ marginInline: 3 }} />
								{card.title}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{card.description}
							</Typography>
							<Button
								variant="contained"
								onClick={() => router.push(card.link)}
								sx={{
									mt: 1,
									bgcolor: "alternative",
									color: "white",
									width: "50%",
								}}
							>
								Acessar!
							</Button>
						</Box>
					</Card>
				))}
			</Box>
			<Footer />
		</Box>
	);
}

export default function Home() {
	const user = useSelector((state: any) => state.user);
	const token = useSelector((state: any) => state.token);
	return Authorization({
		Children: <HomeContainer token={token} user={user} />,
		token,
		user,
	});
}
