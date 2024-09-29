import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { OtherProfileContent } from "../features/layout/other-profile";
export default function OtherProfileRoute() {
    return (_jsx(Box, { backgroundColor: 'black', children: _jsx(OtherProfileContent, {}) }));
}
