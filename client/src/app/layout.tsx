import type { Metadata } from "next";
import "./global.modules.css";
import ThemeContextProvider from "@/styles/theme";
import StateProvider from "@/state/provider/provider";

export const metadata: Metadata = {
	title: "Empreender News",
	description: "Created by rapon1kt",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body>
				<StateProvider>
					<ThemeContextProvider>{children}</ThemeContextProvider>
				</StateProvider>
			</body>
		</html>
	);
}
