import { Post } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	posts: <any>[],
	mode: "light" || "dark",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post: Post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = updatedPosts;
		},
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
	},
});

export const { setLogin, setLogout, setPosts, setPost, setMode } =
	authSlice.actions;
export default authSlice.reducer;
