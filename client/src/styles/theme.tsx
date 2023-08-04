"use client";
import React from "react";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const mainTheme = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			main: "#fff",
		},
		text: {
			primary: "rgba(255, 255, 245, .86)",
			secondary: "rgba(235, 235, 245, .6)",
		},
		background: {
			default: "#1e1e20",
			paper: "#252529",
		},
		alternative: "#F56565",
	},
});

export default function ToggleColorMode({ children }: any) {
	const [mode, setMode] = React.useState<"light" | "dark">("light");
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = React.useMemo(() => createTheme(mainTheme(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
