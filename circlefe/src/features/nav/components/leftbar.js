import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/LeftBar.tsx
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Text, VStack, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { FaBars, FaBell, FaHome, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export function LeftBar() {
    var _a = useDisclosure(), isOpen = _a.isOpen, onOpen = _a.onOpen, onClose = _a.onClose;
    var isMobile = useBreakpointValue({ base: true, md: false });
    var navigate = useNavigate();
    return (_jsx(_Fragment, { children: isMobile ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { icon: _jsx(FaBars, {}), variant: "outline", "aria-label": "Open Menu", onClick: onOpen, position: "fixed", top: "1rem", left: "1rem", zIndex: "1000", color: "white", backgroundColor: "black", _hover: {
                        bg: 'green.600',
                        boxShadow: 'lg',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    } }), _jsxs(Drawer, { isOpen: isOpen, onClose: onClose, placement: "left", children: [_jsx(DrawerOverlay, {}), _jsxs(DrawerContent, { bg: "black", color: "white", children: [_jsx(DrawerCloseButton, {}), _jsx(DrawerHeader, { children: _jsx(Text, { color: 'brand.main', fontSize: "5xl", fontWeight: "bold", children: "Circle" }) }), _jsx(DrawerBody, { children: _jsxs(VStack, { spacing: 4, align: "stretch", children: [_jsx(Button, { leftIcon: _jsx(FaHome, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, color: 'white', onClick: function () { return navigate('/'); }, children: "Home" }), _jsx(Button, { leftIcon: _jsx(FaSearch, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, onClick: onOpen, color: 'white', children: "Search" }), _jsx(Button, { leftIcon: _jsx(FaBell, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, color: 'white', children: "Follows" }), _jsx(Button, { leftIcon: _jsx(FaUser, {}), variant: "outline", size: "lg", border: 'none', justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, color: 'white', onClick: function () { return navigate('/profile'); }, children: "Profile" }), _jsx(Button, { backgroundColor: "brand.main", variant: "solid", borderRadius: 15, color: 'white', _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, children: "Create Post" }), _jsx(Button, { leftIcon: _jsx(FaSignOutAlt, {}), backgroundColor: 'brand.background', color: 'white', _hover: {
                                                    bg: 'green.600',
                                                    boxShadow: 'lg',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease',
                                                }, children: _jsx(Text, { children: "Logout" }) })] }) })] })] })] })) : (_jsx(Box, { as: "aside", width: "250px", bg: "black", p: 4, boxShadow: "md", height: "100vh", position: "fixed", backgroundColor: 'black', color: 'white', children: _jsxs(VStack, { spacing: 1, align: "stretch", children: [_jsx(Box, { mb: 2, children: _jsx(Text, { color: 'brand.main', fontSize: "5xl", fontWeight: "bold", children: "Circle" }) }), _jsxs(VStack, { spacing: 1, align: "stretch", children: [_jsx(Button, { leftIcon: _jsx(FaHome, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                    bg: 'green.600',
                                    boxShadow: 'lg',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease',
                                }, color: 'white', onClick: function () { return navigate('/'); }, children: "Home" }), _jsx(Button, { leftIcon: _jsx(FaSearch, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                    bg: 'green.600',
                                    boxShadow: 'lg',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease',
                                }, onClick: function () { return navigate('/search'); }, color: 'white', children: "Search" }), _jsx(Button, { leftIcon: _jsx(FaBell, {}), variant: "outline", border: 'none', size: "lg", justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                    bg: 'green.600',
                                    boxShadow: 'lg',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease',
                                }, color: 'white', children: "Follows" }), _jsx(Button, { leftIcon: _jsx(FaUser, {}), variant: "outline", size: "lg", border: 'none', justifyContent: "flex-start", width: "100%", textAlign: "left", _hover: {
                                    bg: 'green.600',
                                    boxShadow: 'lg',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease',
                                }, color: 'white', onClick: function () { return navigate('/profile'); }, children: "Profile" })] }), _jsx(Button, { backgroundColor: "brand.main", variant: "solid", mt: 1, borderRadius: 15, color: 'white', _hover: {
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }, children: "Create Post" }), _jsx(Box, { mt: "180", children: _jsx(Button, { leftIcon: _jsx(FaSignOutAlt, {}), backgroundColor: 'brand.background', color: 'white', _hover: {
                                bg: 'green.600',
                                boxShadow: 'lg',
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease',
                            }, children: _jsx(Text, { children: "Logout" }) }) })] }) })) }));
}
;
