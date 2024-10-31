import { createSlice } from '@reduxjs/toolkit';
// Initial state with type
const initialState = {
    user: null,
    accessToken: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
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
