import { Box } from "@chakra-ui/react";
import { useCenterContentProps } from "../utils/center";
import { ResetPassword } from "../features/auth/components/reset-password";


const center = useCenterContentProps();
export default function ResetPasswordRoute() {
    return (
        <Box {...center}>
            <ResetPassword />
        </Box >
    )
}