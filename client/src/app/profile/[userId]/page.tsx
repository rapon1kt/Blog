"use client";
import { Footer, Navbar, getUser } from "@/components";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import UserProfile from "@/components/user-profile/user-profile";

export default function Profile({ params }: { params: { userId: string } }) {
	const { token, user } = useSelector((state: any) => state);
	const userId = params.userId;
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				bgcolor: "background.paper",
				mt: 6,
				pt: 8,
			}}
		>
			<Suspense fallback={"Carregando..."}>
				{getUser({ userId, token }).then((user) => (
					<Navbar isCover={false} user={user} token={token} />
				))}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						flexDirection: {
							xs: "column",
							md: "row",
						},
					}}
				>
					<UserProfile
						token={token}
						userId={userId}
						currentUser={user}
						user={user}
					/>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: {
								lg: "25vw",
								md: "50vw",
								sm: "100vw",
								xs: "100vw",
							},
						}}
					></Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: {
								lg: "25vw",
								md: "50vw",
								sm: "100vw",
								xs: "100vw",
							},
						}}
					></Box>
				</Box>
			</Suspense>
			<Footer />
		</Box>
	);
}
