import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
