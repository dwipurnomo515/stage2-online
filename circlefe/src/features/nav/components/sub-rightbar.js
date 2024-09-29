import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Rightbar.tsx
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
export function SubRightbar() {
    return (_jsxs(Box, { w: "350px" // Lebar card
        , bg: "black" // Background untuk keseluruhan Rightbar
        , boxShadow: "md", borderRadius: "md", children: [_jsxs(Box, { p: 4, borderRadius: "md", border: "1px solid black", bg: "#262626" // Background color untuk suggestion card
                , color: "white", mb: 6, children: [_jsx(Text, { fontSize: "lg", fontWeight: "bold", children: "Suggested for You" }), _jsx(VStack, { spacing: 1, align: "stretch", children: [1, 2, 3, 4, 5].map(function (item) { return (_jsxs(Box, { display: "flex", alignItems: "center", p: 2, borderRadius: "md", bg: "transparent", children: [_jsx(Avatar, { size: "sm", name: "User ".concat(item), src: "https://bit.ly/dan-abramov", mr: 3 }), _jsxs(VStack, { spacing: 1, align: "start", flex: "1", children: [_jsxs(Text, { fontSize: "sm", fontWeight: "bold", children: ["User ", item] }), _jsxs(Text, { fontSize: "xs", color: "gray.400", children: ["user", item, "@example.com"] })] }), _jsx(Button, { ml: "auto", size: "sm", colorScheme: "white", variant: item === 1 ? "solid" : "outline", borderColor: "white", color: item === 1 ? "white" : "white.400", borderRadius: "full", _hover: { borderColor: item === 1 ? 'white.400' : 'white', color: item === 1 ? 'white.400' : 'white' }, children: item === 1 ? "Following" : "Follow" })] }, item)); }) })] }), _jsxs(Box, { p: 1, pl: 2, borderRadius: "sm", border: "1px solid black", bg: "#262626" // Background color untuk credit card
                , color: "white", fontSize: "sm", children: [_jsxs(HStack, { mt: 2, children: [_jsx(Text, { fontSize: "sm", color: "gray.500", children: " Developed by Dwi Purnomo " }), _jsx(BsGithub, { size: 16, color: "gray.500" }), _jsx(FaLinkedin, { size: 16, color: "gray.500" }), _jsx(FaInstagram, { size: 16, color: "gray.500" })] }), _jsx(Text, { fontSize: "xs", color: "gray.500", mt: 1, children: "Powered by DumbWays Indonesia - al Coding Bootcamp" })] }), _jsx(Box, { mt: 8, children: "  " })] }));
}
