import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Divider, HStack, IconButton, Image, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import profileBackground from '../../../assets/a.jpg'; // Pastikan path ini benar
export var posts = [
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
    // Tambahkan lebih banyak postingan sesuai kebutuhan
];
var Post = function (_a) {
    var username = _a.username, imageUrl = _a.imageUrl, text = _a.text, avatarUrl = _a.avatarUrl;
    return (_jsxs(Box, { p: 4, borderRadius: "md", mb: 4, bg: "black", color: "white", children: [_jsxs(HStack, { spacing: 3, mb: 3, children: [_jsx(Avatar, { size: "sm", name: username, src: avatarUrl }), _jsx(Text, { fontWeight: "bold", children: username }), _jsxs(Text, { fontSize: 'small', color: 'grey', children: [" @", username] }), _jsx(Text, { fontSize: 'small', color: 'grey', children: "4h" })] }), _jsx(Text, { mb: 2, children: text }), _jsx(Image, { src: imageUrl, borderRadius: "md", mt: 3 }), _jsxs(HStack, { spacing: 4, mt: 2, children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Like", icon: _jsx(FaHeart, {}) }), _jsx(Text, { fontSize: "sm", color: "gray.300", ml: -4, children: "300" }), _jsxs(HStack, { spacing: 1, align: "center", children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Comment", icon: _jsx(FaComment, {}) }), _jsx(Text, { fontSize: "sm", color: "gray.300", ml: -1, children: "300 Replies" })] })] }), _jsx(Divider, { my: 4 })] }));
};
var MediaGallery = function (_a) {
    var images = _a.images;
    var navigate = useNavigate();
    var handleImageClick = function (id) {
        navigate("/detail-image/".concat(id));
    };
    return (_jsx(SimpleGrid, { columns: { base: 1, sm: 2, md: 3 }, spacing: 4, children: images.map(function (_a) {
            var id = _a.id, url = _a.url;
            return (_jsx(Box, { borderRadius: "md", overflow: "hidden", mt: 2, onClick: function () { return handleImageClick(id); }, cursor: "pointer", children: _jsx(Image, { src: url, alt: "Media ".concat(id), boxSize: "100%", objectFit: "cover" }) }, id));
        }) }));
};
export function OtherProfilePage() {
    var mediaImages = posts
        .filter(function (post) { return post.imageUrl; }) // Hanya ambil yang memiliki imageUrl
        .map(function (post) { return ({ id: post.id, url: post.imageUrl }); }); // Tambahkan ID ke gambar
    var profile = useState({
        name: 'Dwi Purnomo',
        username: 'DwiPurnomo',
        bio: 'picked over by the worms, and weird fishes'
    })[0];
    return (_jsx(Box, { p: 4, maxW: "800px", mx: "auto", color: "white", children: _jsxs(VStack, { spacing: 4, align: "start", children: [_jsxs(HStack, { mb: 4, spacing: 4, children: [_jsx(Link, { to: '/', children: _jsx(IconButton, { icon: _jsx(ArrowBackIcon, {}), background: 'transparent', color: 'white', fontSize: '20px', "aria-label": "Back" }) }), _jsx(Text, { fontSize: "2xl", fontWeight: "bold", ml: -4, children: profile.name })] }), _jsxs(Box, { mb: 6, p: 3, borderRadius: "md", color: "white", position: "relative", overflow: "hidden", children: [_jsx(Box, { w: '650px', h: "100px", borderRadius: "md", backgroundImage: "url(".concat(profileBackground, ")"), backgroundSize: "cover", backgroundPosition: "center", position: "relative", mb: 8, children: _jsx(Box, { position: "absolute", bottom: -15, left: 3, transform: "translateY(50%)", children: _jsx(Avatar, { size: "xl", name: "User Name", src: "https://bit.ly/dan-abramov", border: "2px solid white", borderRadius: "full", mb: 5 }) }) }), _jsx(HStack, { spacing: 3, mt: 3, justify: "flex-end", children: _jsx(Button, { colorScheme: "green", size: "sm", variant: "outline", borderColor: "white", color: "white", borderRadius: "full", _hover: { borderColor: 'green.400', color: 'green.400' }, children: "Follow" }) }), _jsxs(VStack, { align: "start", spacing: 1, children: [_jsx(Text, { fontSize: "xl", fontWeight: "bold", children: profile.name }), _jsxs(Text, { fontSize: 'sm', color: '#909090', children: [profile.username, "@gmail.com"] }), _jsx(Text, { fontSize: "sm", color: "gray.200", children: profile.bio }), _jsxs(HStack, { spacing: 3, children: [_jsxs(HStack, { spacing: 1, children: [_jsx(Text, { fontSize: "sm", fontWeight: "bold", color: "white", children: "123" }), _jsx(Text, { fontSize: "sm", color: "#909090", children: "Following" })] }), _jsxs(HStack, { spacing: 1, children: [_jsx(Text, { fontSize: "sm", fontWeight: "bold", color: "white", children: "456" }), _jsx(Text, { fontSize: "sm", color: "#909090", children: "Followers" })] })] })] })] }), _jsx(Divider, { my: 4 }), _jsx(Box, { w: "full", display: "flex", flexDirection: 'column', children: _jsxs(Tabs, { variant: "enclosed", colorScheme: "teal", children: [_jsxs(TabList, { children: [_jsx(Tab, { flex: 1, _selected: { borderBottom: '6px solid green', color: 'white' }, children: "All Posts" }), _jsx(Tab, { flex: 1, _selected: { borderBottom: '6px solid green', color: 'white' }, children: "Media" })] }), _jsxs(TabPanels, { display: 'flex', flexDirection: 'row', children: [_jsx(TabPanel, { p: 0, flex: "1", children: posts.map(function (post) { return (_jsx(Post, { username: post.username, imageUrl: post.imageUrl, text: post.text, avatarUrl: post.avatarUrl }, post.id)); }) }), _jsx(TabPanel, { p: 0, flex: "1", children: mediaImages.length > 0 ? (_jsx(MediaGallery, { images: mediaImages })) : (_jsx(Text, { children: "No media available." })) })] })] }) })] }) }));
}
