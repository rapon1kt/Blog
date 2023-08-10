import { Box, Button, SxProps, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import NavbarTheme from "../navbar-theme/navbar-theme";
import {
	HomeIcon,
	PhoneIcon,
	SettingsIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import NavbarAuth from "../navbar-auth/navbar-auth";
import { User } from "@/models";

const coverLinks = [
	{
		id: 1,
		name: "Home",
		link: "/home",
		icon: HomeIcon,
	},
	{
		id: 2,
		name: "Sobre",
		link: "#about",
		icon: UsersIcon,
	},
	{
		id: 3,
		name: "Contato",
		link: "#contact",
		icon: PhoneIcon,
	},
];

export default function NavbarIsCover({
	isCover,
	user,
	token,
	props,
}: {
	isCover: boolean;
	user: User;
	token: string;
	props?: {
		box?: SxProps;
		button?: SxProps;
	};
}) {
	const theme = useTheme();
	const router = useRouter();

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	if (isCover === true) {
		return (
			<Box sx={props?.box}>
				{coverLinks.map((item: any) => (
					<Button
						key={item.id}
						variant="contained"
						sx={{
							textTransform: "none",
							color: "text.primary",
							bgcolor: "background.paper",
							marginInline: 1,
							...props?.button,
						}}
						onClick={() => router.push(item.link)}
					>
						<item.icon
							size={24}
							color={alternative}
							style={{ marginRight: 0.5 }}
						/>
						{item.name}
					</Button>
				))}
				<NavbarTheme props={props?.button} />
				<NavbarAuth token={token!} props={props?.button} />
			</Box>
		);
	} else {
		return (
			<Box sx={props?.box}>
				<Button
					variant="contained"
					sx={{
						textTransform: "none",
						color: "text.primary",
						bgcolor: "background.paper",
						marginInline: 1,
						...props?.button,
					}}
					onClick={() => router.push(`/profile/${user._id}`)}
				>
					<UserIcon
						size={24}
						color={alternative}
						style={{ marginRight: 0.5 }}
					/>
					Meu Perfil
				</Button>
				<Button
					variant="contained"
					sx={{
						textTransform: "none",
						color: "text.primary",
						bgcolor: "background.paper",
						marginInline: 1,
						...props?.button,
					}}
					onClick={() => router.push(`/config/${user._id}`)}
				>
					<SettingsIcon
						size={24}
						color={alternative}
						style={{ marginRight: 0.5 }}
					/>
					Configurações
				</Button>
				<NavbarTheme props={props?.button} />
				<NavbarAuth token={token!} props={props?.button} />
			</Box>
		);
	}
}
