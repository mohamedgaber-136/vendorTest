declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("./authSlice").AuthState & import("redux-persist/es/persistReducer").PersistPartial;
    api: import("@reduxjs/toolkit/query").CombinedState<{
        getItems: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../types").ItemType, "api">;
        addItem: import("@reduxjs/toolkit/query").MutationDefinition<{
            endpoint: string;
            newItem: Partial<import("../types").ItemType>;
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../types").AddItemResponse, "api">;
        getVendorServices: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, any, "api">;
        login: import("@reduxjs/toolkit/query").MutationDefinition<{
            email: string;
            password: string;
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
            token: string;
            user: any;
            status: number;
            data: any;
        }, "api">;
    }, never, "api">;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("./authSlice").AuthState & import("redux-persist/es/persistReducer").PersistPartial;
        api: import("@reduxjs/toolkit/query").CombinedState<{
            getItems: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../types").ItemType, "api">;
            addItem: import("@reduxjs/toolkit/query").MutationDefinition<{
                endpoint: string;
                newItem: Partial<import("../types").ItemType>;
            }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../types").AddItemResponse, "api">;
            getVendorServices: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, any, "api">;
            login: import("@reduxjs/toolkit/query").MutationDefinition<{
                email: string;
                password: string;
            }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
                token: string;
                user: any;
                status: number;
                data: any;
            }, "api">;
        }, never, "api">;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export declare const persistor: import("redux-persist").Persistor;
export default store;
