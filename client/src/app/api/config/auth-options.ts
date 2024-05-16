import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const response = await fetch("http://localhost:8884/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});

				const user = await response.json();

				if (user && response.ok) {
					return user;
				} else {
					return;
				}
			},
		}),
	],
	pages: { signIn: "/login" },
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }: any) {
			session = token as any;
			return session;
		},
	},
};
