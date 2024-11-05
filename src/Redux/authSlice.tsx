import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from './api';

// Define types for User and AuthState
export interface User {
  id: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
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
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.token;
        state.user = payload.user;
      }
    );
  },
});

// Export actions to be used in components or middleware
const { setUser, clearUser } = authSlice.actions;
export { setUser, clearUser };

// Export the reducer to be used in the store
export default authSlice.reducer;
