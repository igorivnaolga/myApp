import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addPostOperationType,
  fetchPostsOperationType,
  addCommentOperationType,
} from './constants';
import {
  addPostService,
  getAllPostsService,
  addCommentService,
} from '../../../utils/firestore';

export const fetchPosts = createAsyncThunk(
  fetchPostsOperationType,
  async (userID, thunkAPI) => {
    try {
      const response = await getAllPostsService(userID);

      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  addPostOperationType,
  async (data, thunkAPI) => {
    try {
      const response = await addPostService(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  addCommentOperationType,
  async ({ postId, data }, thunkAPI) => {
    try {
      const response = await addCommentService(postId, data);

      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
