import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./global.modules.css";
import ThemeContextProvider from "@/styles/theme";
import StateProvider from "@/state/provider/provider";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Empreender News",
	description: "Created by rapon1kt",
	icons: {
		icon: "/assets/logo.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body className={raleway.className}>
				<StateProvider>
					<ThemeContextProvider>{children}</ThemeContextProvider>
				</StateProvider>
			</body>
		</html>
	);
}
