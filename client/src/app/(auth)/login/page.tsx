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
	useTheme,
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
	const [response, setResponse] = React.useState(0);
	const [responseMessage, setResponseMessage] = React.useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	const theme = useTheme();

	const login = async (values: any) => {
		const loggedInResponse = await fetch("http://localhost:2007/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		if (loggedInResponse.status === 400) {
			const responseMessage = await loggedInResponse.json();
			setResponse(400);
			setResponseMessage(responseMessage.msg);
		} else if (loggedInResponse.status == 200) {
			const loggedIn = await loggedInResponse.json();
			setResponse(200);
			setResponseMessage("Logado com Sucesso!");
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
			setResponseMessage(
				"Parece que algo de errado aconteceu, tente novamente depois."
			);
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
							backgroundImage:
								theme.palette.mode === "dark"
									? 'url("/assets/login-dark.png")'
									: 'url("/assets/login-light.png")',
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
							{response !== 0 && (
								<Alert
									variant="filled"
									severity={response === 200 ? "success" : "error"}
									sx={{ width: "100%", color: "white" }}
									hidden
								>
									{responseMessage}
								</Alert>
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
								<Copyright />
							</Box>
						</Box>
					</Grid>
				</Grid>
			)}
		</Formik>
	);
}
