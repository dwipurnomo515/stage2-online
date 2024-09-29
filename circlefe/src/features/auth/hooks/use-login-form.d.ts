import { LoginFormInputs } from "../schemas/login";
export declare function useLoginForm(): {
    register: import("react-hook-form").UseFormRegister<{
        password: string;
        email: string;
    }>;
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<{
        password: string;
        email: string;
    }, undefined>;
    errors: import("react-hook-form").FieldErrors<{
        password: string;
        email: string;
    }>;
    isSubmitting: boolean;
    onSubmit: (data: LoginFormInputs) => Promise<boolean | undefined>;
};
