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
  interface ToggleLikeResponse {
    message: string;
    thread: {
      id: number;
      isLiked: boolean;
      likesCount: number;
    };
  }

  async function toggleLike({
    threadId,
  }: {
    threadId: number;
  }): Promise<ToggleLikeResponse> {
    const token = Cookies.get("token");
    const response = await apiV1.post(
      `/threads/${threadId}/like`,
      {},
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data || !response.data.thread) {
      throw new Error("Invalid response from backend");
    }

    console.log("Toggle Like Response:", response.data); // Debugging log
    return response.data;
  }

  const { mutateAsync: toggleLikeAsync } = useMutation<
    ToggleLikeResponse, // Tipe respons yang diharapkan
    Error, // Tipe error
    { userId: number; threadId: number } // Parameter input
  >({
    mutationKey: ["toggleLike"],
    mutationFn: toggleLike,
    onSuccess: (data) => {
      console.log("Mutation success, response:", data); // Debugging log

      // Perbarui state thread berdasarkan respons
      queryClient.setQueryData<ThreadEntity[]>(["threads"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((thread) => {
          if (thread.id === data.thread.id) {
            return {
              ...thread,
              isLiked: data.thread.isLiked,
              likesCount: data.thread.likesCount,
            };
          }
          return thread;
        });
      });
    },
    onError: (error) => {
      console.error("Error toggling like:", error); // Error handling
    },
  });

  async function handleToggleLike(userId: number, threadId: number) {
    try {
      // Kirim request ke backend
      const response = await toggleLikeAsync({ userId, threadId });

      // Perbarui state lokal dengan data respons backend
      queryClient.setQueryData<ThreadEntity[]>(["threads"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              isLiked: response.thread.isLiked, // Status like dari backend
              likesCount: response.thread.likesCount, // Count terbaru dari backend
            };
          }
          return thread;
        });
      });
    } catch (error) {
      console.error("Error toggling like:", error);
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
