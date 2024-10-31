export interface User {
    id: string;
    username: string;
}
export interface AuthState {
    user: User | null;
    accessToken: string | null;
}
declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    user: User;
    accessToken: string;
}, "auth/setUser">, clearUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearUser">;
export { setUser, clearUser };
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
