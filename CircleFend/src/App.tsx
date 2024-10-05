// import { useQuery } from "@tanstack/react-query";
// import Cookies from "js-cookie";
import { AppRouter } from "./routes";
// import { UserStoreDTO } from "./features/auth/types/dto";
// import { useAppDispatch } from "./hooks/use-store";
// import { apiV1 } from "./libs/api";
// import { AppRouter } from "./routes";
// import { setUser } from "./store/auth-slice";

function App() {
  // const dispatch = useAppDispatch();

  // async function getCurrentUser() {
  //   const response = await apiV1.get<null, { data: UserStoreDTO }>(
  //     "/auth/check",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("token")}`,
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     }
  //   );

  //   dispatch(setUser(response.data));

  //   return response.data;
  // }

  // useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: getCurrentUser,
  // }); // TODO: replace this with another one

  return <AppRouter />;
}

export default App;