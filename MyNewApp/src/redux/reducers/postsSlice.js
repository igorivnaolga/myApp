import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { fetchPosts, addPost, addComment } from './operation';

const initialState = {
  isLoading: false,
  data: [],
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state) => {
  state.isLoading = false;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startLoader(state) {
      state.isLoading = true;
    },
    stopLoader(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.data = [...state.data, payload];
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const index = state.data.findIndex((post) => post.id === payload.id);
        state.data.splice(index, 1, payload);
      })

      .addMatcher(isPending(fetchPosts, addPost, addComment), handlePending)
      .addMatcher(isRejected(fetchPosts, addPost, addComment), handleRejected)
      .addMatcher(
        isFulfilled(fetchPosts, addPost, addComment),
        handleFulfilled
      );
  },
  selectors: {
    selectPosts: (state) => state.data,

    selectPostsLoading: (state) => state.isLoading,
  },
});

export const { startLoader, stopLoader } = postsSlice.actions;
export const { selectPosts, selectPostsLoading } = postsSlice.selectors;

export default postsSlice.reducer;
