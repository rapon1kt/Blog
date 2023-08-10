import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.modules.css";
import ThemeContextProvider from "@/styles/theme";
import StateProvider from "@/state/provider/provider";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang="en">
			<body className={inter.className}>
				<StateProvider>
					<ThemeContextProvider>{children}</ThemeContextProvider>
				</StateProvider>
			</body>
		</html>
	);
}
