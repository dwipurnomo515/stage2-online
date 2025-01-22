import { Box } from "@chakra-ui/react";
import { useCenterContentProps } from "../utils/center";
import { RegisterForm } from "../features/auth/components/register";


const center = useCenterContentProps();

export default function RegisterRoute() {
    return (
        <Box {...center}>
            <RegisterForm />
        </Box>
    )
} 