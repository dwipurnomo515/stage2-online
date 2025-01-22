import { StatusMainContent } from "../features/home/components/status";
import { HomeLayout } from "../features/home/layouts/home-layouts";

export default function StatusRoute() {
    return (
        <HomeLayout>
            <StatusMainContent />
        </HomeLayout>
    );
}