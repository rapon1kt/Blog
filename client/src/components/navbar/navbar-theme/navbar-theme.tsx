"use client";
import { setMode } from "@/state/state";
import { Button, SxProps, useTheme } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";

export default function NavbarTheme({ props }: { props?: SxProps }) {
	const theme = useTheme();
	const dispatch = useDispatch();

	const alternative = theme.palette.mode === "dark" ? "#F56565" : "#407BFF";

	if (theme.palette.mode === "light") {
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
				onClick={() => dispatch(setMode())}
			>
				<Moon size={24} color={alternative} style={{ marginRight: 0.5 }} />
				Dark
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
				onClick={() => dispatch(setMode())}
			>
				<Sun size={24} color={alternative} style={{ marginRight: 0.5 }} />
				Light
			</Button>
		);
	}
}
