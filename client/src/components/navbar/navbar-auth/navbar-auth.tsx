"use client";
import { setLogout } from "@/state/state";
import {
	Box,
	Button,
	ListItem,
	ListItemButton,
	SxProps,
	Typography,
	useTheme,
} from "@mui/material";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function NavbarAuth({
	token,
	props,
}: {
	token: string;
	props?: SxProps;
}) {
	const router = useRouter();
	const dispatch = useDispatch();
	const theme = useTheme();

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	if (token) {
		return (
			<Button
				variant="contained"
				sx={{
					textTransform: "none",
					color: "text.primary",
					bgcolor: "background.paper",
					marginInline: 1,
					...props,
				}}
				onClick={() => dispatch(setLogout())}
			>
				<LogOutIcon
					size={24}
					color={alternative}
					style={{ marginRight: 0.5 }}
				/>
				Sair
			</Button>
		);
	} else {
		return (
			<Button
				variant="contained"
				sx={{
					textTransform: "none",
					color: "text.primary",
					bgcolor: "background.paper",
					marginInline: 1,
					...props,
				}}
				onClick={() => router.push("/login")}
			>
				<LogInIcon size={24} color={alternative} style={{ marginRight: 0.5 }} />
				Entrar
			</Button>
		);
	}
}
