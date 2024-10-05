import { Box } from "@chakra-ui/react";
import { LoginForm } from "../features/auth/components/login";
import { useCenterContentProps } from "../utils/center";


const center = useCenterContentProps();
export default function LoginRoute() {
    return (
        <Box {...center}>
            <LoginForm />
        </Box >
    )
}