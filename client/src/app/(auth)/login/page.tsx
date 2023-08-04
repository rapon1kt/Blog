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
import Copyright from "@/components/copyright/copyright";
import { useDispatch } from "react-redux/es/exports";
import { setLogin } from "../../../state/state";
import { useRouter } from "next/navigation";

const loginSchema = yup.object().shape({
	email: yup.string().email("Email inválido").required("Obrigatório"),
	password: yup.string().required("Obrigatório"),
});

const initialValuesLogin = {
	email: "",
	password: "",
};

export default function Login() {
	const [alertBoolean, setAlertBoolean] = React.useState("any");
	const dispatch = useDispatch();
	const router = useRouter();

	const login = async (values: any) => {
		const loggedInResponse = await fetch("http://localhost:2007/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});
		const loggedIn = await loggedInResponse.json();
		if (loggedIn) {
			setAlertBoolean("true");
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			);
			setTimeout(() => {
				router.push("/home");
			}, 1000);
		} else {
			setAlertBoolean("false");
		}
	};

	const handleFormSubmit = async (values: any) => {
		await login(values);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValuesLogin}
			validationSchema={loginSchema}
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
								Fazer Login
							</Typography>
							{alertBoolean !== "any" ? (
								<Alert
									variant="filled"
									severity={alertBoolean === "false" ? "error" : "success"}
									sx={{ width: "100%" }}
									hidden={true}
								>
									{alertBoolean === "false"
										? "Algo de errado aconteceu... :("
										: "Logado com sucesso! Nos vemos mais tarde... ;)"}
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
									label="E-mail"
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
									label="Senha"
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
									Entrar
								</Button>
								<Grid container>
									<Grid item>
										<Link href="/register" variant="body2">
											{"Não possue conta ainda? Crie agora!"}
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
