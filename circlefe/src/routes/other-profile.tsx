import { OtherProfilePage } from "../features/home/components/other-profile";
import { HomeLayout } from "../features/home/layouts/home-layouts";

export default function HomeRoute() {
    return (
        <HomeLayout>
            <OtherProfilePage />
        </HomeLayout>
    );
}