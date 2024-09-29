import { RegisterFormInputs } from "../schemas/register";
export declare function useRegisterForm(): {
    register: import("react-hook-form").UseFormRegister<{
        password: string;
        fullName: string;
        email: string;
    }>;
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<{
        password: string;
        fullName: string;
        email: string;
    }, undefined>;
    errors: import("react-hook-form").FieldErrors<{
        password: string;
        fullName: string;
        email: string;
    }>;
    isSubmitting: boolean;
    onSubmit: (data: RegisterFormInputs) => Promise<void>;
    backendError: string | null;
};
