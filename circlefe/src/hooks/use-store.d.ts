export declare const useAppDispatch: import("react-redux").UseDispatch<import("redux-thunk").ThunkDispatch<{
    auth: import("../features/auth/types/dto").UserStoreDTO;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>>;
export declare const useAppSelector: import("react-redux").UseSelector<{
    auth: import("../features/auth/types/dto").UserStoreDTO;
}>;
