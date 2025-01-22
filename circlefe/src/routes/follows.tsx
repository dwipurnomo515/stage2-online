import { Follows } from "../features/home/components/follows";
import { HomeLayout } from "../features/home/layouts/home-layouts";

export default function FollowsRoute() {
    return (
        <HomeLayout>
            <Follows />
        </HomeLayout>
    );
}