import { Skeleton } from "@mui/material";

export default function UserProfileSkeleton() {
	return (
		<Skeleton
			variant="rectangular"
			sx={{
				width: {
					lg: "30vw",
					md: "80vw",
					sm: "90vw",
					xs: "90vw",
				},
				p: "1rem",
				borderRadius: "1rem",
				minHeight: {
					lg: "80vh",
				},
			}}
		/>
	);
}
