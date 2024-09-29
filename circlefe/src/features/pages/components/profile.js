var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ProfilePage.tsx
import { Avatar, Box, Button, Divider, FormControl, FormLabel, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from '@chakra-ui/react';
import profileBackground from '../../../assets/a.jpg'; // Pastikan path ini benar
import { FaComment, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
var posts = [
    {
        id: 1,
        username: 'Jane Doe',
        imageUrl: '',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        avatarUrl: 'https://bit.ly/2TKx8Gv'
    },
    {
        id: 2,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 3,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 4,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    {
        id: 5,
        username: 'John Smith',
        imageUrl: profileBackground,
        text: 'Another example of a post with different content.',
        avatarUrl: 'https://bit.ly/3F8ArjI'
    },
    // Tambahkan lebih banyak postingan sesuai kebutuhan
];
// Komponen untuk Postingan
var Post = function (_a) {
    var username = _a.username, imageUrl = _a.imageUrl, text = _a.text, avatarUrl = _a.avatarUrl;
    return (_jsxs(Box, { p: 4, borderRadius: "md", mb: 4, bg: "black", color: "white", children: [_jsxs(HStack, { spacing: 3, mb: 3, children: [_jsx(Avatar, { size: "sm", name: username, src: avatarUrl }), _jsx(Text, { fontWeight: "bold", children: username }), _jsxs(Text, { fontSize: 'small', color: 'grey', children: [" @", username] }), _jsx(Text, { fontSize: 'small', color: 'grey', children: "4h" })] }), _jsx(Text, { mb: 2, children: text }), _jsx(Image, { src: imageUrl, borderRadius: "md", mt: 3 }), _jsxs(HStack, { spacing: 4, mt: 2, children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparant', "aria-label": "Like", icon: _jsx(FaHeart, {}) }), _jsx(Text, { fontSize: "sm", color: "gray.300", ml: -4, children: "300" }), _jsxs(HStack, { spacing: 1, align: "center", children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparant', "aria-label": "Comment", icon: _jsx(FaComment, {}) }), _jsx(Text, { fontSize: "sm", color: "gray.300", ml: -1, children: "300 Replies" })] })] }), _jsx(Divider, { my: 4 })] }));
};
var MediaGallery = function (_a) {
    var images = _a.images;
    return (_jsx(SimpleGrid, { columns: { base: 1, sm: 2, md: 3 }, spacing: 4, children: images.map(function (_a) {
            var id = _a.id, url = _a.url;
            return (_jsx(Box, { borderRadius: "md", overflow: "hidden", mt: 2, children: _jsx(Image, { src: url, alt: "Media ".concat(id), boxSize: "100%", objectFit: "cover" }) }, id));
        }) }));
};
export function ProfilePage() {
    var _a = useDisclosure(), isOpen = _a.isOpen, onOpen = _a.onOpen, onClose = _a.onClose;
    var mediaImages = posts
        .filter(function (post) { return post.imageUrl; }) // Hanya ambil yang memiliki imageUrl
        .map(function (post) { return ({ id: post.id, url: post.imageUrl }); }); // Tambahkan ID ke gambar
    var _b = useState({
        name: 'Dwi Purnomo',
        username: 'DwiPurnomo',
        bio: 'picked over by the worms, and weird fishes'
    }), profile = _b[0], setProfile = _b[1];
    // Modal state
    var _c = useState(profile), modalProfile = _c[0], setModalProfile = _c[1];
    // Update profil state dari modal
    var handleSave = function () {
        setProfile(modalProfile);
        onClose();
    };
    return (_jsxs(Box, { p: 4, maxW: "800px", mx: "auto", color: "white", children: [_jsxs(VStack, { spacing: 4, align: "start", children: [_jsx(Text, { fontSize: "2xl", fontWeight: "bold", children: "John Doe" }), _jsxs(Box, { mb: 6, p: 3, borderRadius: "md", 
                        // Background color untuk profil card
                        color: "white", position: "relative", overflow: "hidden" // Mengatur overflow untuk menutupi bagian avatar yang keluar dari card
                        , children: [_jsx(Box, { w: '650px', h: "100px" // Mengecilkan ukuran background image
                                , borderRadius: "md", backgroundImage: "url(".concat(profileBackground, ")"), backgroundSize: "cover", backgroundPosition: "center", position: "relative", mb: 8, children: _jsx(Box, { position: "absolute", bottom: -15, left: 3, transform: "translateY(50%)" // Mengatur posisi avatar agar berada setengah di luar gambar
                                    , children: _jsx(Avatar, { size: "xl" // Mengurangi ukuran avatar
                                        , name: "User Name", src: "https://bit.ly/dan-abramov", border: "2px solid white", borderRadius: "full", mb: 5 }) }) }), _jsxs(HStack, { spacing: 3, mt: 3, justify: "flex-end", children: [" ", _jsx(Button, { colorScheme: "green", size: "sm", variant: "outline", borderColor: "white", color: "white", borderRadius: "full", _hover: { borderColor: 'green.400', color: 'green.400' }, onClick: function () {
                                            setModalProfile(profile); // Set modal state untuk mencocokkan profil state
                                            onOpen();
                                        }, children: "Edit Profile" })] }), _jsxs(VStack, { align: "start", spacing: 1, children: [_jsx(Text, { fontSize: "xl", fontWeight: "bold", children: profile.name }), _jsxs(Text, { fontSize: 'sm', color: '#909090', children: [profile.username, "@gmail.com"] }), _jsx(Text, { fontSize: "sm", color: "gray.200", children: profile.bio }), _jsxs(HStack, { spacing: 3, children: [" ", _jsxs(HStack, { spacing: 1, children: [_jsx(Text, { fontSize: "sm", fontWeight: "bold", color: "white", children: "123" }), _jsx(Text, { fontSize: "sm", color: "#909090", children: "Following" })] }), _jsxs(HStack, { spacing: 1, children: [_jsx(Text, { fontSize: "sm", fontWeight: "bold", color: "white", children: "456" }), _jsx(Text, { fontSize: "sm", color: "#909090", children: "Followers" })] })] })] })] }), _jsx(Divider, { my: 4 }), _jsx(Box, { w: "full", display: "flex", flexDirection: 'column', children: _jsxs(Tabs, { variant: "enclosed", colorScheme: "teal", children: [_jsxs(TabList, { children: [_jsx(Tab, { flex: 1, _selected: { borderBottom: '6px solid green', color: 'white' }, children: "All Posts" }), _jsx(Tab, { flex: 1, _selected: { borderBottom: '6px solid green', color: 'white' }, children: "Media" })] }), _jsxs(TabPanels, { display: 'flex', flexDirection: 'row', children: [_jsx(TabPanel, { p: 0, flex: "1", children: posts.map(function (post) { return (_jsx(Post, { username: post.username, imageUrl: post.imageUrl, text: post.text, avatarUrl: post.avatarUrl }, post.id)); }) }), _jsx(TabPanel, { p: 0, flex: "1", children: mediaImages.length > 0 ? (_jsx(MediaGallery, { images: mediaImages })) : (_jsx(Text, { children: "No media available." })) })] })] }) })] }), _jsxs(Modal, { isOpen: isOpen, onClose: onClose, children: [_jsx(ModalOverlay, {}), _jsxs(ModalContent, { background: 'black', color: 'white', children: [_jsx(ModalHeader, { children: "Edit Profile" }), _jsx(ModalCloseButton, {}), _jsxs(ModalBody, { children: [_jsxs(FormControl, { id: "name", mb: 4, children: [_jsx(FormLabel, { children: "Name" }), _jsx(Input, { value: modalProfile.name, onChange: function (e) { return setModalProfile(__assign(__assign({}, modalProfile), { name: e.target.value })); }, placeholder: "Enter your name" })] }), _jsxs(FormControl, { id: "username", mb: 4, children: [_jsx(FormLabel, { children: "Username" }), _jsx(Input, { value: modalProfile.username, onChange: function (e) { return setModalProfile(__assign(__assign({}, modalProfile), { username: e.target.value })); }, placeholder: "Enter your username" })] }), _jsxs(FormControl, { id: "bio", children: [_jsx(FormLabel, { children: "Bio" }), _jsx(Input, { value: modalProfile.bio, onChange: function (e) { return setModalProfile(__assign(__assign({}, modalProfile), { bio: e.target.value })); }, placeholder: "Enter your bio" })] })] }), _jsx(ModalFooter, { children: _jsx(Button, { colorScheme: "green", mr: 3, onClick: handleSave, children: "Save" }) })] })] })] }));
}
