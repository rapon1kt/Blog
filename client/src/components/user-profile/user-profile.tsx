import {
	Avatar,
	Typography,
	Box,
	Stack,
	IconButton,
	Divider,
	TextField,
	Input,
	Button,
} from "@mui/material";
import { getUser } from "..";
import { User } from "@/models";
import EditUserProfile from "./edit-user-profile/edit-user-profile";
import { Code, Gem, LinkIcon, UserIcon } from "lucide-react";

export default async function UserProfileContainer({
	token,
	userId,
	currentUser,
}: {
	token: string;
	userId: string;
	currentUser: User;
}) {
	const user: User = await getUser({ token, userId });

	const userInfos = [
		{
			id: 1,
			name: "Profissão",
			value: user.role,
		},
		{
			id: 2,
			name: "Série:",
			value: user.grade,
		},
		{
			id: 3,
			name: "Registro Escolar:",
			value: user.registration,
		},
		{
			id: 4,
			name: "Membro desde: ",
			value: new Date(user.createdAt).toLocaleDateString(),
		},
		{
			id: 5,
			name: "Videos:",
			value: 10,
		},
		{
			id: 6,
			name: "Artigos:",
			value: 10,
		},
	];

	return (
		<Box
			sx={{
				bgcolor: "background.default",
				display: "flex",
				alignItems: "center",
				justifyContent: {
					xs: "center",
					md: "space-around",
					lg: "center",
				},
				flexDirection: {
					xs: "column",
					md: "row",
					lg: "column",
				},
				width: {
					lg: "30vw",
					md: "80vw",
					sm: "90vw",
					xs: "90vw",
				},
				p: "1rem",
				borderRadius: "1rem",
				gap: {
					md: "5rem",
					lg: 0,
				},
				boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
				minHeight: {
					lg: "80vh",
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					alignItems: "center",
				}}
			>
				<Avatar
					src={`/assets/users/${user.avatar_url}`}
					sx={{
						width: 150,
						height: 150,
						mb: 1,
						border: `2px solid white`,
						color: "alternative",
						bgcolor: "background.paper",
					}}
				>
					<UserIcon size={80} />
				</Avatar>
				{userId === "64cfc1f81625495c5b57e16d" && (
					<Stack
						sx={{
							display: "flex",
							gap: "2rem",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Gem color="red" />
						<Code color="red" />
					</Stack>
				)}
				<Typography color="text.primary" gutterBottom>
					{new Date(user.birthday).toLocaleDateString()}
				</Typography>

				<Typography color="alternative" variant="h5" gutterBottom>
					{user.name}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{user.avatar_url && (
					<Box
						sx={{
							width: "20rem",
						}}
					>
						{userInfos.map((info) => (
							<Stack
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Typography
									color="text.secondary"
									variant="subtitle1"
									gutterBottom
									sx={{ fontWeight: 600 }}
								>
									{info.name}
								</Typography>
								<Typography
									color="text.primary"
									variant="subtitle1"
									gutterBottom
								>
									{info.value}
								</Typography>
							</Stack>
						))}
						<Divider sx={{ bgcolor: "divider" }} />

						{currentUser._id === user._id && (
							<Box>
								<Typography color="text.secondary" variant="subtitle2">
									Apenas você pode ver essas informações:
								</Typography>
								<Stack
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										alignItems: "center",
										color: "text.secondary",
									}}
								>
									<input
										placeholder={"Email: " + user.email}
										disabled
										style={{
											width: "100%",
											height: "2rem",
											background: "transparent",
											fontSize: "15px",
											border: "none",
											outline: "none",
										}}
									/>
									<EditUserProfile userId={currentUser._id} />
								</Stack>
							</Box>
						)}
						<Divider sx={{ bgcolor: "divider" }} />
						<Button
							fullWidth
							variant="contained"
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.5rem",
								bgcolor: "alternative",
								p: 1,
								my: 1,
							}}
							onClick={() => {
								navigator.clipboard.writeText(window.location.href);
							}}
						>
							<LinkIcon size={20} />
							<Typography color="text.primary" variant="body2">
								Copiar link do perfil
							</Typography>
						</Button>
					</Box>
				)}
				{currentUser._id === userId && !user.avatar_url && (
					<>
						<Typography variant="subtitle1" color="text.primary" align="center">
							Ops! Aparentemente você ainda não terminou seu registro, atualize
							suas informações abaixo para explorar os artigos e vídeos!
						</Typography>
						<EditUserProfile userId={currentUser._id} />
					</>
				)}
			</Box>
		</Box>
	);
}
