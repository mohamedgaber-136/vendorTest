import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for User and AuthState
export interface User { // Explicitly exporting User type
  id: string;
  username: string;
}

export interface AuthState { // Explicitly exporting AuthState type
  user: User | null; // The current authenticated user
  accessToken: string | null; // Access token for authentication
}

// Initial state with type
const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

// Export actions to be used in components or middleware
const { setUser, clearUser } = authSlice.actions;
export { setUser, clearUser };

// Export the reducer to be used in the store
export default authSlice.reducer;
