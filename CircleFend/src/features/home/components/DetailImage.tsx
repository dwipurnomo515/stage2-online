// import React, { useState } from 'react';
// import { Avatar, Box, Button, Divider, Grid, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
// import { useParams } from 'react-router-dom';
// import { posts } from '../components/other-profile'; // Pastikan pathnya benar
// import { FaComment, FaHeart, FaImage } from 'react-icons/fa';

// interface Comment {
//     id: number;
//     username: string;
//     text: string;
//     email: string;
// }

// const comments: Comment[] = [
//     {
//         id: 1,
//         username: 'Alice',
//         text: 'Great picture!',
//         email: 'dwipurnomo',
//     },
//     {
//         id: 2,
//         username: 'Bob',
//         text: 'Really love this!',
//         email: 'dwipurnomo12',
//     }
//     // Tambahkan komentar lainnya sesuai kebutuhan
// ];

// export function DetailImage() {
//     const { id } = useParams<{ id: string }>();
//     const postId = Number(id);
//     const post = posts.find(post => post.id === postId);
//     const [image, setImage] = useState<File | null>(null);
//     const [newComment, setNewComment] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setImage(event.target.files[0]);
//         }
//     };

//     const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setNewComment(event.target.value);
//     };

//     const handleAddComment = () => {
//         if (newComment.trim()) {
//             // Simulasi menambahkan komentar
//             comments.push({
//                 id: comments.length + 1,
//                 username: 'Current User', // Gantilah dengan nama pengguna saat ini
//                 text: newComment,
//                 email: 'current email'
//             });
//             setNewComment('');
//         }
//     };

//     const openModal = (imageUrl: string) => {
//         setModalImageUrl(imageUrl);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setModalImageUrl(null);
//     };

//     if (!post) {
//         return <Text>Post not found</Text>;
//     }

//     return (
//         <Box p={0} maxW="100%" mx="auto" color="white">
//             <Grid
//                 templateColumns={{ base: "1fr", md: "2fr 1fr" }} // Satu kolom pada layar kecil, dua kolom pada layar besar
//                 backgroundColor={'black'}
//                 gap={0}
//                 height="100vh" // Mengisi tinggi layar penuh
//             >
//                 {/* Gambar */}
//                 <Box
//                     gridColumn={{ base: "1 / 2", md: "1 / 2" }}
//                     p={0}
//                     height="100%" // Pastikan kontainer gambar mengisi tinggi penuh
//                     overflow="hidden" // Mencegah gambar meluap keluar dari kontainer
//                     position="relative" // Tambahkan posisi relatif pada kontainer
//                     mx={5} // Tambahkan padding horizontal 5px
//                     boxSizing="border-box" // Pastikan padding tidak menambah lebar kontainer
//                     onClick={() => openModal(post.imageUrl)} // Klik gambar untuk membuka modal
//                 >
//                     <Image
//                         src={post.imageUrl}
//                         alt={`Post ${post.id}`}
//                         objectFit="contain" // Memastikan gambar mengisi kontainer
//                         height="100%" // Pastikan gambar mengisi tinggi kontainer
//                         width="auto" // Mengatur lebar otomatis agar sesuai dengan padding
//                         minWidth="100%" // Pastikan gambar mengisi lebar kontainer dengan padding
//                         position="absolute" // Posisi absolut untuk gambar
//                         top={0}
//                         left={0}
//                     />
//                 </Box>

//                 {/* Komentar */}
//                 <Box gridColumn={{ base: "1 / 2", md: "2 / 3" }}>
//                     <Box bg="black" p={4} borderRadius="md" mb={4}>
//                         <VStack spacing={2} align="start">
//                             <HStack spacing={2}>
//                                 <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
//                                 <VStack align="start" ml={2}>
//                                     <Text fontWeight="bold">John Doe</Text>
//                                     <Text fontSize={'small'} mt={-2} color={'grey'}> @ John Doe</Text>
//                                 </VStack>
//                             </HStack>
//                             <Text>This is the post content. It can be text, images, or other types of content.</Text>
//                             <HStack spacing={4} mt={2}>
//                                 <IconButton size="sm" color="grey" background={'transparent'} aria-label="Like" icon={<FaHeart />} />
//                                 <HStack spacing={1} align="center">
//                                     <IconButton size="sm" color="grey" background={'transparent'} aria-label="Comment" icon={<FaComment />} />
//                                     <Text fontSize="sm" color="gray">300 Replies</Text>
//                                 </HStack>
//                             </HStack>
//                         </VStack>
//                     </Box>

//                     <Divider my={4} />
//                     <Box
//                         mb={6}
//                         p={4}
//                         borderRadius="md"
//                         border="1px solid black"
//                         bg="black"
//                         color="white"
//                         maxH="calc(100vh - 20rem)" // Adjust height as needed
//                         overflowY="auto"
//                     >
//                         <HStack spacing={4}>
//                             <Avatar size="md" name="User" src="https://bit.ly/dan-abramov" />
//                             <VStack align="start" flex="1">
//                                 <InputGroup>
//                                     <Input
//                                         placeholder="What's on your mind?"
//                                         value={newComment}
//                                         onChange={handleCommentChange}
//                                         bg="black"
//                                         color="white"
//                                         borderRadius="md"
//                                         border={'1px grey solid'}
//                                         pr="120px" // Space for icon and button
//                                         onKeyDown={(e) => {
//                                             if (e.key === 'Enter') {
//                                                 handleAddComment();
//                                             }
//                                         }}
//                                     />
//                                     <InputRightElement>
//                                         <HStack spacing={2} ml={-20}>
//                                             <IconButton
//                                                 as="label"
//                                                 htmlFor="image-upload"
//                                                 aria-label="Upload Image"
//                                                 icon={<FaImage />}
//                                                 color="white"
//                                                 bg="transparent"
//                                                 size="md"
//                                                 borderRadius="md"
//                                                 _hover={{ bg: 'grey' }}
//                                             />
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 id="image-upload"
//                                                 style={{ display: 'none' }}
//                                                 onChange={handleImageChange}
//                                             />
//                                             <Button
//                                                 bg="brand.main"
//                                                 color="white"
//                                                 p={3}
//                                                 onClick={handleAddComment}
//                                                 size="xs"
//                                                 borderRadius="full"
//                                                 _hover={{ bg: 'green.400' }}
//                                             >
//                                                 Reply
//                                             </Button>
//                                         </HStack>
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 {image && (
//                                     <Image
//                                         src={URL.createObjectURL(image)}
//                                         alt="Uploaded preview"
//                                         mt={4}
//                                         borderRadius="md"
//                                         mx={'auto'}
//                                         h={'200px'}
//                                     />
//                                 )}
//                             </VStack>
//                         </HStack>
//                     </Box>

//                     <Box
//                         bg="black"
//                         p={4}
//                         borderRadius="md"
//                         border="1px solid black"
//                         color="white"
//                         maxH="calc(100vh - 20rem)" // Adjust height as needed
//                         overflowY="auto"
//                         sx={{
//                             '::-webkit-scrollbar': {
//                                 width: '5px'
//                             },
//                             '::-webkit-scrollbar-track': {
//                                 background: '#2d2d2d'
//                             },
//                             '::-webkit-scrollbar-thumb': {
//                                 background: '#888',
//                                 borderRadius: '8px'
//                             },
//                             '::-webkit-scrollbar-thumb:hover': {
//                                 background: '#555'
//                             }
//                         }}
//                     >
//                         <VStack spacing={3} align="start">
//                             {comments.map((comment) => (
//                                 <Box key={comment.id} p={2} borderRadius="md" width="full">
//                                     <HStack spacing={2}>
//                                         <Avatar size="sm" name={comment.username} />
//                                         <Text fontWeight="bold">{comment.username}</Text>
//                                         <Text fontSize={'small'} color={'grey'}>{comment.email}</Text>
//                                         <Text color="gray" fontSize={'small'}>2h</Text>
//                                     </HStack>
//                                     <Text mt={1}>{comment.text}</Text>
//                                     <Divider my={4} />
//                                 </Box>
//                             ))}
//                         </VStack>
//                     </Box>
//                 </Box>
//             </Grid>

//             {/* Modal untuk menampilkan gambar */}
//             <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
//                 <ModalOverlay />
//                 <ModalContent bg="black" color="white">
//                     <ModalHeader>Image Preview</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         {modalImageUrl && (
//                             <Image
//                                 src={modalImageUrl}
//                                 alt="Modal Image"
//                                 width="100%"
//                                 height="500px"
//                                 objectFit="contain"
//                             />
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="blue" onClick={closeModal}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     );
// }
