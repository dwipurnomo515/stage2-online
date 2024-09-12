import { Box } from "@chakra-ui/react";
import { ResetPassword } from "../features/auth/components/resetpassword";
import { useCenterContentProps } from "../utils/center";


const center = useCenterContentProps();
export default function ResetPasswordRoute() {
    return (
        <Box {...center}>
            <ResetPassword />
        </Box >
    )
}