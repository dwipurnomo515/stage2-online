import { Home } from "../features/home/components/home";
import { HomeLayout } from "../features/home/layouts/home-layouts";

export default function HomeRoute() {
    return (
        <HomeLayout>
            <Home />
        </HomeLayout>
    );
}