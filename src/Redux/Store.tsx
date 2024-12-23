import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { api } from "./api";
import authReducer   from "./authSlice"; // Import AuthState if needed
import serviceReducer   from "./ServiceSlice"; // Import AuthState if needed

const authPersistConfig = {
  key: "auth",
  storage,
};
const servicePersistConfig = {
  key: "service",
  storage,
};
const persistedServiceReducer = persistReducer(servicePersistConfig, serviceReducer);

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    service: persistedServiceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
