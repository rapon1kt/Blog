"use client";
import React from "react";
import {
	Footer,
	Navbar,
	UserProfile,
	ArticlesProfile,
	VideosProfile,
	ArticlePagination,
	getUser,
	UserProfileSkeleton,
} from "@/components";
import { Authorization } from "@/middlewares";
import { User } from "@/models";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Newspaper, Video } from "lucide-react";
import VideoPagination from "@/components/pagination/video-pagination";

function ProfileContainer({
	userId,
	token,
	user,
}: {
	userId: string;
	token: string;
	user: User;
}) {
	const [state, setState] = React.useState<"videos" | "articles">("articles");
	const [posts, setPosts] = React.useState([]);
	const [videos, setVideos] = React.useState([]);
	const [profileUser, setProfileUser] = React.useState<User>();
	const [currentPost, setCurrentArticle] = React.useState(1);
	const [currentVideo, setCurrentVideo] = React.useState(1);
	const [postsPerPage] = React.useState(2);
	const [videosPerPage] = React.useState(1);

	React.useEffect(() => {
		const getPosts = async () => {
			await fetch(`http://localhost:2007/posts/${userId}/posts`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					setPosts(res);
				});
		};

		const getVideos = async () => {
			await fetch(`http://localhost:2007/videos/${userId}/videos`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					setVideos(res);
				});
		};

		const getProfileUser = async () => {
			const user: User = await getUser({ token, userId });
			setProfileUser(user);
		};

		getVideos();
		getProfileUser();
		getPosts();
	}, []);

	const indexOfLastPost = currentPost * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const indexOfLastVideo = currentVideo * videosPerPage;
	const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
	const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

	const articlePaginate = (pageNumber: number) => setCurrentArticle(pageNumber);
	const videoPaginate = (pageNumber: number) => setCurrentVideo(pageNumber);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				bgcolor: "background.paper",
				mt: 3,
				pt: 8,
			}}
		>
			<Navbar params={{ userId }} isCover={false} user={user} token={token} />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: {
						xs: "column",
						lg: "row",
					},
					gap: 5,
					mb: 2,
				}}
			>
				{profileUser ? (
					<UserProfile userId={userId} user={profileUser!} currentUser={user} />
				) : (
					<UserProfileSkeleton />
				)}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						bgcolor: "background.default",
						boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
						minHeight: "80vh",
						borderRadius: "16px",
						p: 1,
					}}
				>
					<Button
						onClick={() =>
							setState((prevSate) =>
								prevSate === "videos" ? "articles" : "videos"
							)
						}
						variant="outlined"
						sx={{
							color: "text.primary",
							outlineColor: "text.primary",
							gap: "1rem",
							fontSize: "20px",
							my: 1,
						}}
					>
						{state === "videos" ? <Video size={30} /> : <Newspaper size={30} />}
						{state === "videos" ? "Vídeos" : "Artigos"}
					</Button>
					{state === "videos" ? (
						<>
							<VideosProfile
								user={user}
								userId={userId}
								videos={currentVideos}
							/>
							<VideoPagination
								totalVideos={videos.length}
								paginate={videoPaginate}
							/>
						</>
					) : (
						<>
							<ArticlesProfile
								posts={currentPosts}
								userId={userId}
								user={user}
							/>
							<ArticlePagination
								totalPosts={posts.length}
								paginate={articlePaginate}
							/>
						</>
					)}
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default function Profile({ params }: { params: { userId: string } }) {
	const token = useSelector((state: { token: string }) => state.token);
	const user = useSelector((state: { user: User }) => state.user);

	return Authorization({
		Children: (
			<ProfileContainer userId={params.userId} token={token} user={user} />
		),
		token,
		user,
	});
}
