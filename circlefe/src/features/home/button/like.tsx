import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { apiV1 } from "../../../libs/api";
import Cookies from "js-cookie";
import { FaHeart } from "react-icons/fa";
import { color } from "framer-motion";
import { ButtonLink } from "./link";






interface LikeButtonProps {
    threadId: number | any
}

const LikeButtonThread: React.FC<LikeButtonProps> = ({ threadId }: any) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [, setLikeCount] = React.useState(0);
    const queryClient = useQueryClient();

    const fetchLike = async () => {
        const response = await apiV1.get(`/threads/${threadId}/like`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likesCount);
    }
    useEffect(() => {
        fetchLike();

    }, [threadId]);

    const mutation = useMutation<void, Error, void>({
        mutationFn: async () => {
            await apiV1.post(`/threads/${threadId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            });
        },
        onSuccess: () => {
            setIsLiked((prev) => {
                const newLikedStatus = !prev;
                setLikeCount((prevCount) =>
                    newLikedStatus ? prevCount + 1 : prevCount - 1
                );
                return newLikedStatus;
            });
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === 'thread' && query.queryKey[1] === +threadId
                }
            });
            queryClient.invalidateQueries({ queryKey: ['threads'] })
        },
    });

    const handleLike = () => {
        mutation.mutate();
    };

    const likeIconRed = <FaHeart style={{ color: 'red', fontSize: '18px', marginRight: '5px' }} />
    const likeIconGray = <FaHeart style={{ color: 'gray', fontSize: '18px', marginRight: '5px' }} />


    return (
        <ButtonLink fontSize={'12px'} to={''} onClick={handleLike}>
            {isLiked ? likeIconRed : likeIconGray}

        </ButtonLink>
    );
}


export default LikeButtonThread;