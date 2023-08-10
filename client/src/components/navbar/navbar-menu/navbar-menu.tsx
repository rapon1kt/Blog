"use client";
import { Button, Menu, useTheme, Box } from "@mui/material";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import NavbarIsCover from "../navbar-is-cover/navbar-is-cover";
import { User } from "@/models";

export default function NavbarMenu({
	token,
	user,
	isCover,
}: {
	token: string;
	user: User;
	isCover: boolean;
}) {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	return (
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
				<NavbarIsCover
					isCover={isCover}
					token={token}
					user={user}
					props={{
						box: {
							display: "flex",
							flexDirection: "column",
							gap: 1,
							p: 1,
						},
					}}
				/>
			</Menu>
		</Box>
	);
}
