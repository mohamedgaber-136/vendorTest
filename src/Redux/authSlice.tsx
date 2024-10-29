import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for User and AuthState
interface User {
  id: string;
  username: string;
  // Add other fields if needed
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

// Initial state with type
const initialState: AuthState = {
  user: null,
  accessToken: null, // Example token, can be set to null initially
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
