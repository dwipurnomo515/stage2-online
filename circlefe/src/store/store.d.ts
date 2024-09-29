export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("../features/auth/types/dto").UserStoreDTO;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("../features/auth/types/dto").UserStoreDTO;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
