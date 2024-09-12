import { Avatar, Box, Button, Divider, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { color } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaComment, FaHeart, FaImage } from 'react-icons/fa'; // Import icons for image upload, like, and comment
import { Link } from 'react-router-dom';

interface Post {
    content: string;
    image: File | string | null;
    likes: number; // New field for likes
    isLiked: boolean; // New field to track if the post is liked
}

export function HomeMainContent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postContent, setPostContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [posts, setPosts] = useState<Post[]>([
        { content: 'Ini Post Pertama', image: null, likes: 200, isLiked: false },
        { content: 'Here is another post with some content.', image: 'https://image.popmama.com/content-images/community/20230808/community-69df9efa827de8c5984ed98c80af52dd.JPG', likes: 222, isLiked: false },
        { content: 'Here is another post with some content.', image: 'https://image.popmama.com/content-images/community/20230808/community-69df9efa827de8c5984ed98c80af52dd.JPG', likes: 222, isLiked: false },
    ]); // State to store posts
    const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(event.target.value);
    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handlePostSubmit = () => {
        // Add new post to the posts state
        setPosts([...posts, { content: postContent, image, likes: 0, isLiked: false }]);
        setPostContent('');
        setImage(null);
        onClose();
    };
    const handleLikeClick = (index: number) => {
        const updatedPosts = [...posts];
        const post = updatedPosts[index];
        if (post) {
            post.isLiked = !post.isLiked;
            post.likes += post.isLiked ? 1 : -1;
            setPosts(updatedPosts);
        }
    };
    return (
        <Box
            w="700px"
            p={4}
            ml={-8}
            bg="black"
            boxShadow="md"
            borderRadius="md"
            borderX={'1px grey solid'}
            borderLeft="1px solid grey" // Border kiri
            borderRight="1px solid grey" // Border kanan
        >
            <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                mb={4}
            >
                Home
            </Text>

            {/* Button to open the post popup */}
            <Box
                mb={6}
                p={4}
                borderRadius="md"
                border="1px solid black"
                bg="black"
                color="white"
            >
                <HStack spacing={4}>
                    <Avatar size="md" name="User" src="https://bit.ly/dan-abramov" />
                    <VStack align="start" flex="1">
                        <InputGroup>
                            <Input
                                placeholder="What's on your mind?"
                                bg="black"
                                color="white"
                                borderRadius="md"
                                border={'1px grey solid'}
                                pr="120px" // Space for icon and button
                                onClick={onOpen}
                            />
                            <InputRightElement>
                                <HStack spacing={2} ml={-20}>
                                    <IconButton
                                        as="label"
                                        htmlFor="image-upload"
                                        aria-label="Upload Image"
                                        icon={<FaImage />}
                                        color="white"
                                        bg="transparent"
                                        size="md"
                                        borderRadius="md"
                                        _hover={{ bg: 'grey' }}

                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-upload"
                                        style={{ display: 'none' }}

                                    />
                                    <Button
                                        bg="brand.main"
                                        color="white"
                                        p={3}

                                        size="sm"
                                        borderRadius="full"
                                        _hover={{ bg: 'green.400' }}
                                    >
                                        Post
                                    </Button>
                                </HStack>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>
                </HStack>
            </Box>

            {/* Popup for Post Content */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="black" color="white" mr={20} w={'1000px'}>
                    <ModalHeader>Create a Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <HStack spacing={4}>
                            <VStack align="start" flex="1">
                                <InputGroup>
                                    <Avatar size="md" name="User" mr={3} src="https://bit.ly/dan-abramov" />
                                    <Input
                                        placeholder="What's on your mind?"
                                        value={postContent}
                                        onChange={handlePostChange}
                                        bg="black"
                                        color="white"
                                        borderRadius="md"
                                        border={'1px grey solid'}
                                        pr="100px" // Space for image upload and button
                                        h="100px" // Increase height
                                        pb={16}
                                    />
                                </InputGroup>
                                {image && (
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded preview"
                                        mt={4}
                                        borderRadius="md"
                                        mx={'auto'}
                                        h={'200px'}

                                    />
                                )}
                            </VStack>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <HStack spacing={3}>
                            <IconButton
                                as="label"
                                htmlFor="image-upload-modal"
                                aria-label="Upload Image"
                                icon={<FaImage />}
                                color="white"
                                bg="transparent"
                                size="md"
                                borderRadius="md"
                                _hover={{ bg: 'grey' }}
                                mr={275}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="image-upload-modal"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <Button
                                bg="brand.main"
                                color="white"
                                onClick={handlePostSubmit}
                                size="sm"
                                borderRadius="full"
                                _hover={{ bg: 'green.400' }}
                            >
                                Post
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Divider my={-4} mb={1} borderColor="#2D2D2D" />

            {/* Posts from Others */}
            <VStack spacing={4} align="stretch">
                {posts.map((post, index) => (
                    <Box
                        key={index}
                        p={4}
                        borderRadius="md"
                        border="1px solid black"
                        color="white"
                    >
                        <HStack spacing={4}>
                            <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
                            <VStack align="start">
                                <HStack spacing={2}>
                                    <Text fontWeight="bold">John Doe</Text>
                                    <Text fontSize={'small'} color={'grey'}>@john dae</Text>
                                    <Text color="gray" fontSize={'small'}>2h</Text>
                                </HStack>

                                <Text>{post.content}</Text>
                                {post.image && (
                                    <Image
                                        src={typeof post.image === 'string' ? post.image : URL.createObjectURL(post.image)}
                                        alt="Uploaded preview"
                                        mt={4}
                                        borderRadius="md"
                                        mx={'auto'}
                                        h={'200px'}


                                    />
                                )}
                            </VStack>
                        </HStack>
                        <Divider my={2} />
                        <HStack spacing={4} mt={2}>
                            <IconButton
                                size="sm"
                                color={post.isLiked ? 'red' : 'white'} // Change color based on liked status
                                backgroundColor={post.isLiked ? 'transparent' : 'black'} // Ubah warna latar belakang
                                aria-label="Like"
                                icon={<FaHeart />}
                                onClick={() => handleLikeClick(index)}

                            />
                            <Text fontSize="sm" color="gray.300" ml={-4}>{post.likes}</Text>
                            <HStack spacing={1} align="center">
                                <Link to={'/status'}>
                                    <IconButton
                                        size="sm"
                                        colorScheme="#262626"
                                        aria-label="Comment"
                                        icon={<FaComment />}
                                    />
                                </Link>
                                <Text fontSize="sm" color="gray.300" ml={-1}>300 Replies</Text>
                            </HStack>
                        </HStack>
                        <Text color="gray.400" mt={2}>2 hours ago</Text>
                    </Box>
                ))}
            </VStack>
            <Divider my={2} borderColor="#2D2D2D" />
        </Box>
    );
}
