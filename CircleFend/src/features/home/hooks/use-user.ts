import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { apiV1 } from '../../../libs/api';
import { useToast } from '@chakra-ui/react';
import { updateUserFormInput, updateUserSchema } from '../schemas/user';
import { UserEntity } from '../../../entities/user';
import { UpdateUserDTO } from '../../auth/types/dto';

export function useUser() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<updateUserFormInput>({
            resolver: zodResolver(updateUserSchema)
        });
    const queryClient = useQueryClient();
    const toast = useToast();

    async function getUser() {
        const response = await apiV1.get<null, { data: UserEntity }>(
            '/getUser', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
        );
        console.log(response.data)
        return response.data;
    }

    const { data, isLoading, refetch } = useQuery<UserEntity, Error, UserEntity>({
        queryKey: ['user'],
        queryFn: getUser,
    })

    async function updateUser(data: UpdateUserDTO) {
        const formData = new FormData();
        formData.append('userName', data.userName ?? '');
        formData.append('fullName', data.fullName ?? '');
        formData.append('bio', data.bio ?? '');
        if (data.profileImage && data.profileImage.length > 0) {
            console.log('Appending profile image:', data.profileImage[0]);
            formData.append('profileImage', data.profileImage[0]);
        }

        if (data.backgroundImage && data.backgroundImage.length > 0) {
            formData.append('backgroundImage', data.backgroundImage[0]);
        }

        const response = await apiV1.put<null, { data: UserEntity }>(
            `/users`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                'Content-Type': 'multipart/form-data',
            }
        }
        );

        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.refetchQueries({
            queryKey: ['user'],
        });


        console.log("Response from updateUser:", response.data);
        return response.data;

    }

    const { mutateAsync: updateProfileAsync } = useMutation<
        UserEntity,
        Error,
        UpdateUserDTO>({
            mutationKey: ['updateUser'],
            mutationFn: updateUser,
        })

    async function onSubmit(data: updateUserFormInput) {
        const updateUser: UpdateUserDTO = {
            userName: data.userName,
            fullName: data.fullName,
            bio: data.bio,
            profileImage: data.profileImage,
            backgroundImage: data.backgroundImage
        };


        console.log("ss", updateUser);

        try {
            const profilePromise = updateProfileAsync(updateUser);
            await refetch();  // Pastikan mengambil data terbaru setelah update

            await toast.promise(profilePromise, {
                loading: {
                    title: 'Updating Profile',
                    description: 'Please wait...',
                    duration: 5000,
                    isClosable: true,
                },
                success: {
                    title: 'Profile Updated',
                    description: 'Your profile has been updated successfully!',
                    duration: 5000,
                    isClosable: true,
                },
                error: {
                    title: 'Profile Update Failed',
                    description: 'There was an error updating your profile.',
                    duration: 5000,
                    isClosable: true,
                },
            });

        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Profile Update Failed",
                description: "There was an error updating your profile.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data,
        isLoading
    };
}