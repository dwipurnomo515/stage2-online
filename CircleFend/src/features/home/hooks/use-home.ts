import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { CreateThreadFormInputs, createThreadSchema } from "../schemas/thread";
import { CreateThreadDTO } from "../types/thread";

export function useHome() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateThreadFormInputs>({
        resolver: zodResolver(createThreadSchema),
    });

    // State untuk menyimpan gambar pratinjau
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    async function getThreads() {
        const token = Cookies.get("token");
        const response = await apiV1.get<null, { data: ThreadEntity[] }>(
            "/threads",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }

    const { data, isLoading } = useQuery<ThreadEntity[], Error, ThreadEntity[]>({
        queryKey: ["threads"],
        queryFn: getThreads,
    });

    const queryClient = useQueryClient();

    async function createThread(data: CreateThreadDTO) {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("image", data.image[0]);

        const response = await apiV1.post<null, { data: ThreadEntity }>(
            "/threads",
            formData
        );

        queryClient.invalidateQueries({ queryKey: ["threads"] });

        return response.data;
    }

    const { mutateAsync: createThreadAsync } = useMutation<
        ThreadEntity,
        Error,
        CreateThreadDTO
    >({
        mutationKey: ["createThread"],
        mutationFn: createThread,
    });

    async function onSubmit(data: CreateThreadFormInputs) {
        await createThreadAsync(data);
        reset();
        setPreviewImage(null); // Reset pratinjau setelah pengiriman
        alert("Thread berhasil dibuat!");
    }

    // Fungsi untuk menangani perubahan input gambar
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const fileArray = Array.from(files); // Mengonversi FileList ke array File
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewImage(reader.result as string); // Set gambar pratinjau
            };

            reader.readAsDataURL(fileArray[0]); // Baca file pertama untuk preview
            setValue("image", fileArray); // Set nilai untuk react-hook-form
        } else {
            setPreviewImage(null);
            setValue("image", []);
        }
    }
    // Fungsi untuk toggle like
    async function toggleLike({ userId, threadId }: { userId: number; threadId: number }) {
        const token = Cookies.get("token");
        const response = await apiV1.post(
            `/${userId}/threads/${threadId}/like`, // Endpoint yang benar
            {}, // Body request (bisa kosong)
            {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Toggle Like Response:', response); // Log hasil dari toggleLike
        return response.data; // Kembalikan data terbaru dari backend
    }

    const { mutateAsync: toggleLikeAsync } = useMutation<number, Error, { userId: number; threadId: number }>({
        mutationKey: ["toggleLike"],
        mutationFn: toggleLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] }); // Refresh data thread setelah like/unlike
        },
    });

    async function handleToggleLike(userId: number, threadId: number) {
        try {
            await toggleLikeAsync({ userId, threadId });

            queryClient.setQueryData<ThreadEntity[]>(["threads"], (oldData) => {
                if (!oldData) return oldData;

                return oldData.map((thread) => {
                    if (thread.id === threadId) {
                        console.log('Before Update:', thread); // Log thread sebelum update
                        const updatedThread = {
                            ...thread,
                            isLiked: !thread.isLiked,
                            likesCount: thread.isLiked ? thread.likesCount - 1 : thread.likesCount + 1,
                        };
                        console.log('Updated Thread:', updatedThread); // Log thread setelah update
                        return updatedThread;
                    }
                    return thread;
                });
            });
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }



    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data,
        isLoading,
        previewImage,
        handleImageChange,
        handleToggleLike,

    };
}
