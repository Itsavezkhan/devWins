import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "./userThunks";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "google" | "github";
  googleId?: string;
  githubId?: string;
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
