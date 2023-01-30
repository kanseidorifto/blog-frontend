import { configureStore } from '@reduxjs/toolkit';

import { posts } from './slices/posts';

const store = configureStore({
	reducer: { posts },
});

export default store;
