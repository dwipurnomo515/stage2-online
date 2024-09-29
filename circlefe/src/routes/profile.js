import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { ProfileContent } from "../features/layout/profile";
export default function ProfileRoute() {
    return (_jsx(Box, { backgroundColor: 'black', children: _jsx(ProfileContent, {}) }));
}
