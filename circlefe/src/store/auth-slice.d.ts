import { UserStoreDTO } from "@/features/auth/types/dto";
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<UserStoreDTO, "auth/setUser">, removeUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/removeUser">;
declare const _default: import("redux").Reducer<UserStoreDTO>;
export default _default;
