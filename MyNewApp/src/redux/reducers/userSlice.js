import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

// Створення slice для користувача
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      console.log('Redux Updated:', action.payload);
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      console.log('User Logged Out');
      state.userInfo = null;
    },
  },
  selectors: {
    selectInfo: (state) => state.userInfo,
  },
});

// Експорт дій для використання у компонентах
export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const { selectInfo } = userSlice.selectors;
// Експорт ред'юсера для підключення до Store
export default userSlice.reducer;
