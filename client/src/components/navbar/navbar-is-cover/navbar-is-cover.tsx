import { Box, IconButton, SxProps, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import NavbarTheme from "../navbar-theme/navbar-theme";
import {
	Home,
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
		link: "/home",
		icon: HomeIcon,
	},
	{
		id: 2,
		link: "#about",
		icon: UsersIcon,
	},
	{
		id: 3,
		link: "#contact",
		icon: PhoneIcon,
	},
];

export default function NavbarIsCover({
	isCover,
	user,
	token,
	props,
	params,
}: {
	isCover: boolean;
	user: User;
	token: string;
	props?: {
		box?: SxProps;
		button?: SxProps;
	};
	params?: { userId: string };
}) {
	const theme = useTheme();
	const router = useRouter();

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	if (isCover === true) {
		return (
			<Box sx={props?.box}>
				{coverLinks.map((item: any) => (
					<IconButton
						key={item.id}
						sx={{
							textTransform: "none",
							color: "text.primary",
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
					</IconButton>
				))}
				<NavbarTheme props={props?.button} />
				<NavbarAuth token={token!} props={props?.button} />
			</Box>
		);
	} else {
		return (
			<Box sx={props?.box}>
				{params?.userId ? (
					<IconButton
						sx={{
							textTransform: "none",
							color: "text.primary",
							marginInline: 1,
							...props?.button,
						}}
						onClick={() => router.push(`/home`)}
					>
						<Home size={24} color={alternative} style={{ marginRight: 0.5 }} />
					</IconButton>
				) : (
					<IconButton
						sx={{
							textTransform: "none",
							color: "text.primary",
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
					</IconButton>
				)}
				<IconButton
					sx={{
						textTransform: "none",
						color: "text.primary",
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
				</IconButton>
				<NavbarTheme props={props?.button} />
				<NavbarAuth token={token!} props={props?.button} />
			</Box>
		);
	}
}
