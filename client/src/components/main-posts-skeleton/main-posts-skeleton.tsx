import { Skeleton, Grid, Box } from "@mui/material";

const skeletonPosts = [1, 2, 3];

export default function MainPostSkeleton() {
	return (
		<Grid container sx={{ display: "flex" }}>
			{skeletonPosts.map((skeletonPost: number) => (
				<Grid
					item
					key={skeletonPost}
					md={4}
					xs={12}
					sx={{ width: "100%" }}
					p={5}
				>
					<Skeleton variant="rectangular" sx={{ width: "100%", height: 300 }} />
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Skeleton
							variant="text"
							sx={{ width: "100%", height: "50px", mb: "-4rem" }}
						/>
						<Skeleton
							variant="text"
							sx={{ width: "100%", height: "300px", m: 0 }}
						/>
					</Box>
				</Grid>
			))}
		</Grid>
	);
}
