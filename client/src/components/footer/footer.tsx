import * as React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Box, Grid, Link, Typography, Container } from "@mui/material";
import { Copyright } from "..";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "background.paper",
			}}
		>
			<Container maxWidth="lg" sx={{ p: 5 }}>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={4} id="about">
						<Typography variant="h6" color="text.primary" gutterBottom>
							Sobre Nós
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Fundada com o propósito de incentivar a criatividade e o espírito
							científico entre os jovens, nossa empresa visa fornecer uma
							plataforma onde estudantes possam compartilhar suas descobertas,
							insights e perspectivas únicas através de artigos científicos
							desenvolvidos em suas escolas.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} id="contact">
						<Typography variant="h6" color="text.primary" gutterBottom>
							Contato
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Av. Pres. Tancredo de Almeida Neves, 45 - São Judas Tadeu, Itajubá
							- MG, 37504-066
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Email: secretaria@colegioempreender.com.br
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Telefone: (35) 3629-5736
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} id="social-medias">
						<Typography variant="h6" color="text.primary" gutterBottom>
							Redes Sociais
						</Typography>
						<Link
							href="https://www.facebook.com/colegioempreender"
							color="alternative"
						>
							<Facebook />
						</Link>
						<Link
							href="https://www.instagram.com/colegio.empreender"
							color="alternative"
							sx={{ pl: 1, pr: 1 }}
						>
							<Instagram />
						</Link>
					</Grid>
				</Grid>
				<Copyright
					props={{
						mt: "5rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContet: "center",
					}}
				/>
			</Container>
		</Box>
	);
}
