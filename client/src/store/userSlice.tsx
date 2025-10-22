import { createSlice } from '@reduxjs/toolkit';
const initialState = {
   user : {
    userId:0,
    fullName: ""
        
}
};
const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {
        userId:0,
        fullName: ""              
      };
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;