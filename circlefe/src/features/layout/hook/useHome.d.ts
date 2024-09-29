import { ThreadEntity } from "@/entities/thread";
import { CreateThreadFormInputs } from "@/features/auth/schemas/thread";
export declare function useHome(): {
    register: import("react-hook-form").UseFormRegister<{
        image: FileList;
        content: string;
    }>;
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<{
        image: FileList;
        content: string;
    }, undefined>;
    errors: import("react-hook-form").FieldErrors<{
        image: FileList;
        content: string;
    }>;
    isSubmitting: boolean;
    onSubmit: (data: CreateThreadFormInputs) => Promise<void>;
    data: ThreadEntity[] | undefined;
    isLoading: boolean;
};
