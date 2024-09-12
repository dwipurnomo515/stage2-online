import { Box } from "@chakra-ui/react";
import { ForgotPassword } from "../features/auth/components/forgotpassword";
import { useCenterContentProps } from "../utils/center";


const center = useCenterContentProps();
export default function ForgotPasswordRoute() {
    return (
        <Box {...center}>
            <ForgotPassword />
        </Box >
    )
}