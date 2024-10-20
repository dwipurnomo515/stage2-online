import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { apiV1 } from "../../../libs/api";
import Cookies from "js-cookie";
import { ButtonLink } from "./link";




interface followButtonProps {
    userId: number
}

const FollowButton: React.FC<followButtonProps> = ({ userId }) => {
    const [, setIsFollow] = React.useState(false);
    const [buttonText, setbuttonText] = useState<string>("Follow");

    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchFollow = async () => {
            try {
                const response = await apiV1.get(`/follow/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });

                setIsFollow(response.data.isFollowing);
                setbuttonText(response.data.isFollowing ? "Unfollow" : "Follow")
            } catch (error) {
                console.error("Error fetching follow status:", error);

            }
        };
        fetchFollow();
    }, [userId]);

    const handleFollow = async () => {
        try {
            const response = await apiV1.patch(`/follow/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            const newFollowStatus = response.data.isFollowing;

            setIsFollow(newFollowStatus);
            setbuttonText(newFollowStatus ? "Unfollow" : "Follow");

            queryClient.invalidateQueries({
                queryKey: ['user', userId],
            });

            queryClient.invalidateQueries({
                queryKey: ['follow-status', userId],
            });


        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };
    return (
        <ButtonLink
            to={''} // pastikan memberikan nilai yang valid untuk properti 'to'
            height={'28px'}
            fontSize={'11px'}
            bg={'transparent'}
            color={'nav.text'}
            fontWeight={'700'}
            padding={'5px 13px'}
            onClick={handleFollow} // tetap di sini
            borderRadius={'20px'}
            border={'1px solid #FFFFFF'}
        >
            {buttonText}  {/* Children harus berupa ReactNode */}
        </ButtonLink>

    )

}

export default FollowButton;