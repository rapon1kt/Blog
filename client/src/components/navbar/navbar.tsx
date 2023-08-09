"use client";
import * as React from "react";
import {
	HomeIcon,
	LogInIcon,
	MenuIcon,
	PhoneIcon,
	UsersIcon,
	UserIcon,
	LogOut,
	User2Icon,
	Moon,
	Sun,
	LayoutDashboard,
} from "lucide-react";
import {
	Avatar,
	Menu,
	MenuItem,
	Button,
	Typography,
	Toolbar,
	ListItemButton,
	Box,
	Divider,
	List,
	ListItem,
	AppBar,
	IconButton,
	Drawer,
	Stack,
	useTheme,
} from "@mui/material";
import { Copyright } from "@/components";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogout } from "@/state/state";
import { User } from "@/models";
import { ColorModeContext } from "@/styles/theme";

interface NavbarProps {
	props?: () => Window;
	token?: string;
	user: User;
}

const navLinks = [
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

export default function NavBar({ props, token, user }: NavbarProps) {
	// THEME CONFIG
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);

	// ROUTER CONFIG
	const router = useRouter();

	// STATES CONFIGS

	const dispatch = useDispatch();

	// DRAWER OPTIONS
	const window = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	// MENU OPTIONS
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	const drawer = (
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
							width: "100%",
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
								<Typography
									variant="h6"
									align="right"
									sx={{
										color: "text.secondary",
										textDecoration: "none",
										width: "100%",
									}}
								>
									{item.name}
								</Typography>
							</ListItemButton>
						</ListItem>
					</Box>
				))}
				<Box
					sx={{
						width: "100%",
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
							<Typography
								variant="h6"
								align="right"
								sx={{
									color: "text.secondary",
									textDecoration: "none",
									width: "100%",
								}}
							>
								Tema
							</Typography>
						</ListItemButton>
					</ListItem>
					{token ? (
						<ListItem key={4} onClick={() => dispatch(setLogout())}>
							<ListItemButton
								sx={{ textAlign: "center", color: "alternative" }}
							>
								<LogOut style={{ marginInline: 6, color: alternative }} />
								<Typography
									variant="h6"
									align="right"
									sx={{
										color: "text.secondary",
										textDecoration: "none",
										width: "100%",
									}}
								>
									Sair
								</Typography>
							</ListItemButton>
						</ListItem>
					) : (
						<ListItem key={5} onClick={() => router.push("/login")}>
							<ListItemButton sx={{ textAlign: "center" }}>
								<LogInIcon style={{ marginInline: 6, color: alternative }} />
								<Typography
									variant="h6"
									align="right"
									sx={{
										color: "text.secondary",
										textDecoration: "none",
										width: "100%",
									}}
								>
									Entrar
								</Typography>
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
						{navLinks.map((item) => (
							<Button
								key={item.id}
								sx={{
									color: "alternative",
									gap: 0.5,
									bgcolor: "background.paper",
									margin: "0.4rem",
								}}
								onClick={() => router.push(item.link)}
							>
								<item.icon />
								<Typography variant="body2" color="text.secondary">
									{item.name}
								</Typography>
							</Button>
						))}
						<Button
							sx={{
								color: "alternative",
								gap: 0.5,
								bgcolor: "background.paper",
								marginInline: "0.4rem",
							}}
							onClick={colorMode.toggleColorMode}
						>
							{theme.palette.mode === "light" ? (
								<Moon style={{ marginInline: 6 }} />
							) : (
								<Sun style={{ marginInline: 6 }} />
							)}
							<Typography variant="body2" color="text.secondary">
								Tema
							</Typography>
						</Button>
						{token ? (
							<Button
								sx={{
									color: "alternative",
									gap: 0.5,
									bgcolor: "background.paper",
									marginInline: "0.4rem",
								}}
								onClick={() => dispatch(setLogout())}
							>
								<LogOut />
								<Typography variant="body2" color="text.secondary">
									Sair
								</Typography>
							</Button>
						) : (
							<Button
								sx={{
									color: "alternative",
									gap: 0.5,
									bgcolor: "background.paper",
									marginInline: "0.4rem",
								}}
								onClick={() => router.push("/login")}
							>
								<LogInIcon />
								<Typography variant="body2" color="text.secondary">
									Entrar
								</Typography>
							</Button>
						)}
					</Box>
					<Box sx={{ display: { xs: "block", md: "none" } }}>
						<Button
							id="basic-button"
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							<LayoutDashboard color={alternative} />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							{navLinks.map((item) => (
								<MenuItem
									key={item.id}
									sx={{ my: 1, gap: 0.4, mx: 3 }}
									onClick={() => router.push(item.link)}
								>
									<item.icon color={alternative} />
									{item.name}
								</MenuItem>
							))}
							<MenuItem
								sx={{ my: 1, gap: 0.4, mx: 3 }}
								onClick={colorMode.toggleColorMode}
							>
								{theme.palette.mode === "light" ? (
									<Moon style={{ color: alternative }} />
								) : (
									<Sun style={{ color: alternative }} />
								)}
								Tema
							</MenuItem>
							<MenuItem
								sx={{ my: 1, gap: 0.4, mx: 3 }}
								onClick={() => {
									if (token) return router.push("/login");
									router.push("/register");
								}}
							>
								{token ? (
									<>
										<LogOut color={alternative} />
										Sair
									</>
								) : (
									<>
										<LogInIcon color={alternative} />
										Entrar
									</>
								)}
							</MenuItem>
						</Menu>
					</Box>
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
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}
