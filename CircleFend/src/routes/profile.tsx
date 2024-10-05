import { ProfilePage } from "../features/home/components/profile";
import { ProfileLayout } from "../features/home/layouts/profile-layout";

export default function ProfileRoute() {
    return (
        <ProfileLayout>
            <ProfilePage />
        </ProfileLayout>
    );
}