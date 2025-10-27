import { createSlice } from '@reduxjs/toolkit';

const persistedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  user: persistedUser ? JSON.parse(persistedUser) : { userId: 0, fullName: "" }
};

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    clearUser(state) {
      state.user = { userId: 0, fullName: "" };
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;