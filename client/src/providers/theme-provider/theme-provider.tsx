import { CssVarsProvider } from "@mui/joy";
import React from "react";

interface Props {
	children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
	return <CssVarsProvider defaultMode="dark">{children}</CssVarsProvider>;
}
