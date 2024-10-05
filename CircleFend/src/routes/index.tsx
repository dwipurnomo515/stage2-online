import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPasswordRoute from "./forgotpassword";
import HomeRoute from "./home";
import LoginRoute from "./login";
import RegisterRoute from "./register";
import ResetPasswordRoute from "./resetpassword";
import ProfileRoute from "./profile";
import OtherProfileRoute from "./other-profile";
import StatusRoute from "./status";
import SearchRoute from "./search";

// import { DetailImage } from "../features/pages/components/DetailImage";




export function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeRoute />,
        },
        {
            path: "/login",
            element: <LoginRoute />,
        },

        {
            path: "/register",
            element: <RegisterRoute />,
        },
        {
            path: "/forgotpassword",
            element: <ForgotPasswordRoute />,
        },
        {
            path: "/resetpassword",
            element: <ResetPasswordRoute />,
        },
        {
            path: "/status/:threadId",
            element: <StatusRoute />,
        },
        {
            path: "/profile",
            element: <ProfileRoute />,
        },
        {
            path: "/otherprofile",
            element: <OtherProfileRoute />,
        },
        // {
        //     path: "/detail-image/:id",
        //     element: <DetailImage />,
        // },
        {
            path: "/search",
            element: <SearchRoute />,
        },


    ]);

    return <RouterProvider router={router} />;
}