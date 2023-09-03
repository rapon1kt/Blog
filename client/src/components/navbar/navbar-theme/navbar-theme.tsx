"use client";
import { setMode } from "@/state/state";
import { IconButton, SxProps, useTheme } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";

export default function NavbarTheme({ props }: { props?: SxProps }) {
	const theme = useTheme();
	const dispatch = useDispatch();

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	if (theme.palette.mode === "light") {
		return (
			<IconButton
				sx={{
					textTransform: "none",
					color: "text.primary",
					marginInline: 1,
					...props,
				}}
				onClick={() => dispatch(setMode())}
			>
				<Moon size={24} color={alternative} style={{ marginRight: 0.5 }} />
			</IconButton>
		);
	} else {
		return (
			<IconButton
				sx={{
					textTransform: "none",
					color: "text.primary",
					marginInline: 1,
					...props,
				}}
				onClick={() => dispatch(setMode())}
			>
				<Sun size={24} color={alternative} style={{ marginRight: 0.5 }} />
			</IconButton>
		);
	}
}
