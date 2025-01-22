import { Box } from "@chakra-ui/react";
import { useCenterContentProps } from "../utils/center";
import { ForgotPassword } from "../features/auth/components/forgot-password";


const center = useCenterContentProps();
export default function ForgotPasswordRoute() {
    return (
        <Box {...center}>
            <ForgotPassword />
        </Box >
    )
}