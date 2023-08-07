import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.modules.css";
import ThemeContextProvider from "@/styles/theme";
import StateProvider from "@/state/provider/provider";
import Footer from "@/components/footer/footer";

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
			<ThemeContextProvider>
				<body className={inter.className}>
					<StateProvider>
						{children}
						<Footer />
					</StateProvider>
				</body>
			</ThemeContextProvider>
		</html>
	);
}
