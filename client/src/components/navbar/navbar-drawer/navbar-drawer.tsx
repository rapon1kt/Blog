"use client";
import React from "react";
import {
	Avatar,
	Box,
	Divider,
	ListItem,
	ListItemButton,
	Typography,
	List,
	useTheme,
} from "@mui/material";
import {
	HomeIcon,
	LogInIcon,
	LogOut,
	Moon,
	PhoneIcon,
	Sun,
	UsersIcon,
} from "lucide-react";
import { Copyright } from "@/components";
import { ColorModeContext } from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogout } from "@/state/state";

const navLinks = [
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

export default function NavbarDrawer({ token }: { token: string }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const theme = useTheme();

	const colorMode = React.useContext(ColorModeContext);

	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	return (
		<Box
			onClick={handleDrawerToggle}
			sx={{
				bgcolor: "background.default",
				height: "100vh",
			}}
		>
			<Box
				sx={{
					py: "1rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
					height: "20vh",
				}}
			>
				<Avatar
					src="/assets/logo.png"
					alt="logo"
					sx={{ width: 80, height: 80 }}
				/>
				<Typography variant="h6">Colégio Empreender</Typography>
			</Box>
			<Divider sx={{ bgcolor: "text.secondary", width: "100%" }} />
			<List
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					bgcolor: "background.paper",
				}}
			>
				{navLinks.map((item) => (
					<Box
						key={item.id}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ListItem onClick={() => router.push(item.link)}>
							<ListItemButton
								sx={{ textAlign: "center", color: "alternative" }}
							>
								<item.icon style={{ marginInline: 6 }} />
							</ListItemButton>
						</ListItem>
					</Box>
				))}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ListItem key={4} onClick={colorMode.toggleColorMode}>
						<ListItemButton sx={{ textAlign: "center", color: "alternative" }}>
							{theme.palette.mode === "light" ? (
								<Moon style={{ marginInline: 6 }} />
							) : (
								<Sun style={{ marginInline: 6 }} />
							)}
						</ListItemButton>
					</ListItem>
					{token ? (
						<ListItem key={5} onClick={() => dispatch(setLogout())}>
							<ListItemButton
								sx={{ textAlign: "center", color: "alternative" }}
							>
								<LogOut style={{ marginInline: 6, color: alternative }} />
							</ListItemButton>
						</ListItem>
					) : (
						<ListItem key={5} onClick={() => router.push("/login")}>
							<ListItemButton sx={{ textAlign: "center" }}>
								<LogInIcon style={{ marginInline: 6, color: alternative }} />
							</ListItemButton>
						</ListItem>
					)}
				</Box>
			</List>
			<Divider sx={{ bgcolor: "text.secondary", width: "100%" }} />
			<Copyright
				props={{
					height: "20vh",
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
				}}
			/>
		</Box>
	);
}
