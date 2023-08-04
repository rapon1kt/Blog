"use client";
import * as React from "react";
import * as yup from "yup";
import {
	Typography,
	Link,
	Grid,
	CssBaseline,
	Paper,
	Box,
	Avatar,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
	Alert,
} from "@mui/material";
import { Formik } from "formik";
import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import Copyright from "@/components/copyright/copyright";

const registerSchema = yup.object().shape({
	name: yup.string().required("Obrigatório"),
	email: yup.string().email("Email inválido").required("Obrigatório"),
	password: yup.string().required("Obrigatório"),
	birthday: yup
		.date()
		.required("Obrigatório")
		.test(
			"require 13 years",
			"Você precisa ter mais de 12 anos",
			function (birthday) {
				if (new Date().getFullYear() - birthday.getFullYear() >= 12) {
					return true;
				} else {
					return false;
				}
			}
		),
});

const initialValuesRegister = {
	name: "",
	email: "",
	password: "",
	birthday: "",
};

interface NewUserProps {
	name: string;
}

export default function Register() {
	const [alertBoolean, setAlertBoolean] = React.useState("any");
	const router = useRouter();
	const handleFormSubmit = async (newUser: NewUserProps) => {
		const handlePost = await fetch("http://localhost:2007/auth/register", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		if (handlePost.ok === false) {
			setAlertBoolean("false");
		} else {
			const response = await handlePost.json();
			if (response) {
				setAlertBoolean("true");
				router.push("/login");
			}
		}
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValuesRegister}
			validationSchema={registerSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<Grid container component="main">
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundImage: `url("/assets/primary-page.png")`,
							backgroundSize: "contain",
							backgroundRepeat: {
								md: "no-repeat",
								xs: "repeat-y",
							},
						}}
					/>
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square
					>
						<Box
							sx={{
								height: "100vh",
								py: 1,
								mx: 4,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Avatar
								sx={{
									m: 1,
									width: "80px",
									height: "80px",
									bgcolor: "text.secondary",
								}}
							>
								<Newspaper />
							</Avatar>
							<Typography
								component="h1"
								variant="h4"
								color="text.primary"
								fontWeight={600}
							>
								Criar Conta
							</Typography>
							{alertBoolean !== "any" ? (
								<Alert
									variant="filled"
									severity={alertBoolean === "false" ? "error" : "success"}
									hidden={true}
								>
									{alertBoolean === "false"
										? "Algo de errado aconteceu."
										: "Registrado com sucesso!"}
								</Alert>
							) : (
								<p hidden>Not found component</p>
							)}
							<Box
								component="form"
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 1 }}
							>
								<TextField
									margin="normal"
									label="Coloque seu nome"
									type="name"
									name="name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
									error={Boolean(touched.name) && Boolean(errors.name)}
									helperText={touched.name && errors.name}
									sx={{ gridColumn: "span 2" }}
									required
									fullWidth
								/>
								<TextField
									margin="normal"
									label="Coloque seu email"
									type="email"
									name="email"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.email}
									error={Boolean(touched.email) && Boolean(errors.email)}
									helperText={touched.email && errors.email}
									sx={{ gridColumn: "span 2" }}
									required
									fullWidth
								/>
								<TextField
									margin="normal"
									label="Crie uma senha :)"
									type="password"
									name="password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									error={Boolean(touched.password) && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									sx={{ gridColumn: "span 2" }}
									required
									fullWidth
								/>
								<TextField
									margin="normal"
									type="date"
									name="birthday"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.birthday}
									error={Boolean(touched.birthday) && Boolean(errors.birthday)}
									helperText={touched.birthday && errors.birthday}
									sx={{ gridColumn: "span 2" }}
									required
									fullWidth
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Lembrar de mim"
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2, bgcolor: "alternative" }}
								>
									Registrar
								</Button>
								<Grid container>
									<Grid item>
										<Link href="/login" variant="body2">
											{"Já possui uma conta? Entre agora!"}
										</Link>
									</Grid>
								</Grid>
								<Copyright sx={{ mt: 5 }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			)}
		</Formik>
	);
}
