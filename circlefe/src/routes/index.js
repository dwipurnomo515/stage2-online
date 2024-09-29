import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPasswordRoute from "./forgotpassword";
import HomeRoute from "./home";
import LoginRoute from "./login";
import RegisterRoute from "./register";
import ResetPasswordRoute from "./resetpassword";
import StatusRoute from "./status";
import ProfileRoute from "./profile";
import OtherProfileRoute from "./other-profile";
import { DetailImage } from "../features/pages/components/DetailImage";
import SearchRoute from "./search";
export function AppRouter() {
    var router = createBrowserRouter([
        {
            path: "/",
            element: _jsx(HomeRoute, {}),
        },
        {
            path: "/login",
            element: _jsx(LoginRoute, {}),
        },
        {
            path: "/register",
            element: _jsx(RegisterRoute, {}),
        },
        {
            path: "/forgotpassword",
            element: _jsx(ForgotPasswordRoute, {}),
        },
        {
            path: "/resetpassword",
            element: _jsx(ResetPasswordRoute, {}),
        },
        {
            path: "/status",
            element: _jsx(StatusRoute, {}),
        },
        {
            path: "/profile",
            element: _jsx(ProfileRoute, {}),
        },
        {
            path: "/otherprofile",
            element: _jsx(OtherProfileRoute, {}),
        },
        {
            path: "/detail-image/:id",
            element: _jsx(DetailImage, {}),
        },
        {
            path: "/search",
            element: _jsx(SearchRoute, {}),
        },
    ]);
    return _jsx(RouterProvider, { router: router });
}
