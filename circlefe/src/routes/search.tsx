import { SearchMainContent } from "../features/home/components/search";
import { HomeLayout } from "../features/home/layouts/home-layouts";

export default function SearchRoute() {
    return (
        <HomeLayout>
            <SearchMainContent />
        </HomeLayout>
    );
}