import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { SearchContent } from "../features/layout/search";
export default function SearchRoute() {
    return (_jsx(Box, { backgroundColor: 'black', children: _jsx(SearchContent, {}) }));
}
