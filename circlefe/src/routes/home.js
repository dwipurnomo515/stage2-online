import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { HomeContent } from "../features/layout/home";
export default function HomeRoute() {
    return (_jsx(Box, { backgroundColor: 'black', children: _jsx(HomeContent, {}) }));
}
