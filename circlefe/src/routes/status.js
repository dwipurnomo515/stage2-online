import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { StatusContent } from "../features/layout/status";
export default function StatusRoute() {
    return (_jsx(Box, { backgroundColor: 'black', children: _jsx(StatusContent, {}) }));
}
