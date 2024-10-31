import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import { api } from "./api"; // Import your API slice here
import authReducer from "./authSlice"; // Import the authReducer
// Define the configuration for persisting auth state
const authPersistConfig = {
    key: "auth",
    storage,
};
// Create a persisted version of the auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// Configure the Redux store
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Persisted auth reducer
        [api.reducerPath]: api.reducer, // API reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these actions for serialization
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(api.middleware), // Add the API middleware
});
// Create a persistor for the store
export const persistor = persistStore(store);
// Export the configured store
export default store;
