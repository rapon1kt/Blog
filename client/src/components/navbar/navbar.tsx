"use client";
import * as React from "react";
import { MenuIcon } from "lucide-react";
import {
	Avatar,
	Typography,
	Toolbar,
	Box,
	AppBar,
	IconButton,
	Drawer,
} from "@mui/material";
import { User } from "@/models";
import NavbarDrawer from "./navbar-drawer/navbar-drawer";
import NavbarIsCover from "./navbar-is-cover/navbar-is-cover";
import NavbarMenu from "./navbar-menu/navbar-menu";

interface NavbarProps {
	props?: () => Window;
	token?: string;
	user: User;
	isCover: boolean;
}

export default function NavBar({ props, token, user, isCover }: NavbarProps) {
	// DRAWER OPTIONS
	const window = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar component="nav" sx={{ bgcolor: "background.default" }}>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: {
							xs: "space-between",
						},
					}}
				>
					<IconButton
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" }, color: "alternative" }}
					>
						<MenuIcon />
					</IconButton>
					<Avatar
						src="/assets/logo.png"
						alt="logo"
						sx={{
							display: { xs: "none", sm: "block" },
						}}
					/>
					<Typography
						variant="h6"
						color="text.primary"
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
							ml: "1rem",
						}}
					>
						Colégio Empreender
					</Typography>
					<Box
						sx={{
							display: { xs: "none", sm: "none", md: "block" },
							alignItems: "center",
							justifyContent: "space-around",
						}}
					>
						<NavbarIsCover token={token!} user={user} isCover={isCover} />
					</Box>
					<NavbarMenu isCover={isCover} user={user} token={token!} />
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: 250,
						},
					}}
				>
					<NavbarDrawer token={token!} />
				</Drawer>
			</Box>
		</Box>
	);
}
