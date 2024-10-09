
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterFormInputs, registerSchema } from "../schemas/register";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/dto";
import { useAppDispatch } from "../../../hooks/use-store";
import { setUser } from "../../../store/auth-slice";





export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const [backendError, setBackendError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    async function onSubmit(data: RegisterFormInputs) {
        try {
            setBackendError(null);

            const response = await axios.post<null, { data: RegisterResponseDTO }, RegisterRequestDTO>(
                "http://localhost:5000/api/v1/auth/register",
                {
                    email: data.email,
                    fullName: data.fullName,
                    password: data.password,
                }
            );
            console.log("response", response.data);
            const { id, email, fullName, role, userName = '', bio = '' } = response.data;
            dispatch(setUser({
                id,
                email,
                fullName,
                role,
                userName,
                bio
            }));



            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);

            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                console.log("Error response data:", error.response.data);
                setBackendError(data.message || "Terjadi kesalahan.");
                if (data.details && data.details.length > 0) {
                    setError(data.details[0].path[0], {
                        message: data.details[0].message,
                    });
                } else {
                    // Handle any other error responses
                    console.error("Unhandled error response:", data);
                }
            }
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        backendError
    };

}