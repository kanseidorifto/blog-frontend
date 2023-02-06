import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPostsStatus', async (fields) => {
	const { data } = await axios.get('/posts', { params: fields });
	return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
	await axios.delete(`/posts/${id}`);
});

export const fetchTags = createAsyncThunk('posts/fetchTagsStatus', async () => {
	const { data } = await axios.get('/tags');
	return data;
});

export const fetchPostsByTag = createAsyncThunk(
	'posts/fetchPostsByTagStatus',
	async ({ tag, fields }) => {
		const { data } = await axios.get(`/tags/${tag}`, { params: fields });
		return data;
	},
);

const initialState = {
	posts: { items: [], status: 'loading' },
	tags: { items: [], status: 'loading' },
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		// fetching posts
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'success';
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = 'error';
		},
		// fetching posts by tag
		[fetchPostsByTag.pending]: (state) => {
			state.posts.status = 'loading';
		},
		[fetchPostsByTag.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'success';
		},
		[fetchPostsByTag.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = 'error';
		},
		// remove post
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
		},
		// tags
		[fetchTags.pending]: (state) => {
			state.tags.status = 'loading';
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = 'success';
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = 'error';
		},
	},
});

export const posts = postsSlice.reducer;
