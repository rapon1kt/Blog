import type { Metadata } from "next";
import "./global.modules.css";
import { AuthProvider, ThemeProvider } from "@/providers";

export const metadata: Metadata = {
	title: "Blog",
	description: "Created by rapon1kt",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<AuthProvider>
				<ThemeProvider>
					<body>{children}</body>
				</ThemeProvider>
			</AuthProvider>
		</html>
	);
}
