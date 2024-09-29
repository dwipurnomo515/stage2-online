import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Layout.tsx
import { Box, Flex } from '@chakra-ui/react';
import { LeftBar } from '../nav/components/leftbar';
import { Rightbar } from '../nav/components/rightbar';
import { SearchMainContent } from '../pages/components/search';
export function SearchContent() {
    return (_jsx(Box, { children: _jsxs(Flex, { direction: "row", p: 4, bg: "black", minH: "100vh", children: [_jsx(Box, { w: "250px", mx: 0, ml: -3, my: -5, bg: 'black', children: _jsx(LeftBar, {}) }), _jsx(Box, { flex: "1", ml: 3, my: -3, borderX: '1px grey solid', children: _jsx(SearchMainContent, {}) }), _jsx(Box, { w: "350px", my: -5, backgroundColor: 'black', children: _jsx(Rightbar, {}) })] }) }));
}
