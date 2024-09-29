import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { posts } from '../components/other-profile'; // Pastikan pathnya benar
import { FaComment, FaHeart, FaImage } from 'react-icons/fa';
var comments = [
    {
        id: 1,
        username: 'Alice',
        text: 'Great picture!',
        email: 'dwipurnomo',
    },
    {
        id: 2,
        username: 'Bob',
        text: 'Really love this!',
        email: 'dwipurnomo12',
    }
    // Tambahkan komentar lainnya sesuai kebutuhan
];
export function DetailImage() {
    var id = useParams().id;
    var postId = Number(id);
    var post = posts.find(function (post) { return post.id === postId; });
    var _a = useState(null), image = _a[0], setImage = _a[1];
    var _b = useState(''), newComment = _b[0], setNewComment = _b[1];
    var _c = useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = useState(null), modalImageUrl = _d[0], setModalImageUrl = _d[1];
    var handleImageChange = function (event) {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    var handleCommentChange = function (event) {
        setNewComment(event.target.value);
    };
    var handleAddComment = function () {
        if (newComment.trim()) {
            // Simulasi menambahkan komentar
            comments.push({
                id: comments.length + 1,
                username: 'Current User', // Gantilah dengan nama pengguna saat ini
                text: newComment,
                email: 'current email'
            });
            setNewComment('');
        }
    };
    var openModal = function (imageUrl) {
        setModalImageUrl(imageUrl);
        setIsModalOpen(true);
    };
    var closeModal = function () {
        setIsModalOpen(false);
        setModalImageUrl(null);
    };
    if (!post) {
        return _jsx(Text, { children: "Post not found" });
    }
    return (_jsxs(Box, { p: 0, maxW: "100%", mx: "auto", color: "white", children: [_jsxs(Grid, { templateColumns: { base: "1fr", md: "2fr 1fr" }, backgroundColor: 'black', gap: 0, height: "100vh" // Mengisi tinggi layar penuh
                , children: [_jsx(Box, { gridColumn: { base: "1 / 2", md: "1 / 2" }, p: 0, height: "100%" // Pastikan kontainer gambar mengisi tinggi penuh
                        , overflow: "hidden" // Mencegah gambar meluap keluar dari kontainer
                        , position: "relative" // Tambahkan posisi relatif pada kontainer
                        , mx: 5, boxSizing: "border-box" // Pastikan padding tidak menambah lebar kontainer
                        , onClick: function () { return openModal(post.imageUrl); }, children: _jsx(Image, { src: post.imageUrl, alt: "Post ".concat(post.id), objectFit: "contain" // Memastikan gambar mengisi kontainer
                            , height: "100%" // Pastikan gambar mengisi tinggi kontainer
                            , width: "auto" // Mengatur lebar otomatis agar sesuai dengan padding
                            , minWidth: "100%" // Pastikan gambar mengisi lebar kontainer dengan padding
                            , position: "absolute" // Posisi absolut untuk gambar
                            , top: 0, left: 0 }) }), _jsxs(Box, { gridColumn: { base: "1 / 2", md: "2 / 3" }, children: [_jsx(Box, { bg: "black", p: 4, borderRadius: "md", mb: 4, children: _jsxs(VStack, { spacing: 2, align: "start", children: [_jsxs(HStack, { spacing: 2, children: [_jsx(Avatar, { size: "sm", name: "John Doe", src: "https://bit.ly/dan-abramov" }), _jsxs(VStack, { align: "start", ml: 2, children: [_jsx(Text, { fontWeight: "bold", children: "John Doe" }), _jsx(Text, { fontSize: 'small', mt: -2, color: 'grey', children: " @ John Doe" })] })] }), _jsx(Text, { children: "This is the post content. It can be text, images, or other types of content." }), _jsxs(HStack, { spacing: 4, mt: 2, children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Like", icon: _jsx(FaHeart, {}) }), _jsxs(HStack, { spacing: 1, align: "center", children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Comment", icon: _jsx(FaComment, {}) }), _jsx(Text, { fontSize: "sm", color: "gray", children: "300 Replies" })] })] })] }) }), _jsx(Divider, { my: 4 }), _jsx(Box, { mb: 6, p: 4, borderRadius: "md", border: "1px solid black", bg: "black", color: "white", maxH: "calc(100vh - 20rem)" // Adjust height as needed
                                , overflowY: "auto", children: _jsxs(HStack, { spacing: 4, children: [_jsx(Avatar, { size: "md", name: "User", src: "https://bit.ly/dan-abramov" }), _jsxs(VStack, { align: "start", flex: "1", children: [_jsxs(InputGroup, { children: [_jsx(Input, { placeholder: "What's on your mind?", value: newComment, onChange: handleCommentChange, bg: "black", color: "white", borderRadius: "md", border: '1px grey solid', pr: "120px" // Space for icon and button
                                                            , onKeyDown: function (e) {
                                                                if (e.key === 'Enter') {
                                                                    handleAddComment();
                                                                }
                                                            } }), _jsx(InputRightElement, { children: _jsxs(HStack, { spacing: 2, ml: -20, children: [_jsx(IconButton, { as: "label", htmlFor: "image-upload", "aria-label": "Upload Image", icon: _jsx(FaImage, {}), color: "white", bg: "transparent", size: "md", borderRadius: "md", _hover: { bg: 'grey' } }), _jsx("input", { type: "file", accept: "image/*", id: "image-upload", style: { display: 'none' }, onChange: handleImageChange }), _jsx(Button, { bg: "brand.main", color: "white", p: 3, onClick: handleAddComment, size: "xs", borderRadius: "full", _hover: { bg: 'green.400' }, children: "Reply" })] }) })] }), image && (_jsx(Image, { src: URL.createObjectURL(image), alt: "Uploaded preview", mt: 4, borderRadius: "md", mx: 'auto', h: '200px' }))] })] }) }), _jsx(Box, { bg: "black", p: 4, borderRadius: "md", border: "1px solid black", color: "white", maxH: "calc(100vh - 20rem)" // Adjust height as needed
                                , overflowY: "auto", sx: {
                                    '::-webkit-scrollbar': {
                                        width: '5px'
                                    },
                                    '::-webkit-scrollbar-track': {
                                        background: '#2d2d2d'
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        background: '#888',
                                        borderRadius: '8px'
                                    },
                                    '::-webkit-scrollbar-thumb:hover': {
                                        background: '#555'
                                    }
                                }, children: _jsx(VStack, { spacing: 3, align: "start", children: comments.map(function (comment) { return (_jsxs(Box, { p: 2, borderRadius: "md", width: "full", children: [_jsxs(HStack, { spacing: 2, children: [_jsx(Avatar, { size: "sm", name: comment.username }), _jsx(Text, { fontWeight: "bold", children: comment.username }), _jsx(Text, { fontSize: 'small', color: 'grey', children: comment.email }), _jsx(Text, { color: "gray", fontSize: 'small', children: "2h" })] }), _jsx(Text, { mt: 1, children: comment.text }), _jsx(Divider, { my: 4 })] }, comment.id)); }) }) })] })] }), _jsxs(Modal, { isOpen: isModalOpen, onClose: closeModal, size: "full", children: [_jsx(ModalOverlay, {}), _jsxs(ModalContent, { bg: "black", color: "white", children: [_jsx(ModalHeader, { children: "Image Preview" }), _jsx(ModalCloseButton, {}), _jsx(ModalBody, { children: modalImageUrl && (_jsx(Image, { src: modalImageUrl, alt: "Modal Image", width: "100%", height: "500px", objectFit: "contain" })) }), _jsx(ModalFooter, { children: _jsx(Button, { colorScheme: "blue", onClick: closeModal, children: "Close" }) })] })] })] }));
}
