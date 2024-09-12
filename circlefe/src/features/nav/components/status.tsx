// src/components/PostDetail.tsx
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Divider, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaComment, FaHeart, FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Comment {
    id: number;
    username: string;
    text: string;
    email: string;
}

const sampleComments: Comment[] = [
    { id: 1, username: 'user1', text: 'Great post!', email: '@user1' },
    { id: 2, username: 'user2', text: 'Thanks for sharing!', email: '@user2' },
];

export function StatusMainContent() {
    const [comments, setComments] = useState<Comment[]>(sampleComments);
    const [newComment, setNewComment] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);


    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };



    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: comments.length + 1,
                username: 'current_user', // Replace with actual username
                text: newComment,
                email: '@current_email'
            };
            setComments([...comments, newCommentObj]);
            setNewComment('');
            setImage(null);
        }
    };

    return (
        <Box p={4} color={'white'}>
            <HStack mb={4} spacing={4}>
                <Link to={'/'}>
                    <IconButton icon={<ArrowBackIcon />} background={'transparent'} color={'white'} fontSize={'20px'} aria-label="Back" />
                </Link>
                <Text fontSize="2xl" ml={-3} fontWeight="bold">Status</Text>
            </HStack>

            <Box bg="black" p={4} borderRadius="md" mb={4}>
                <VStack spacing={2} align="start">
                    <HStack spacing={2}>
                        <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
                        <VStack align="start" ml={2}>
                            <Text fontWeight="bold">John Doe</Text>
                            <Text fontSize={'small'} mt={-2} color={'grey'}> @ John Doe</Text>

                        </VStack>
                    </HStack>
                    <Text>This is the post content. It can be text, images, or other types of content.</Text>
                    <HStack spacing={4} mt={2}>
                        <IconButton size="sm" color="grey" background={'transparent'} aria-label="Like" icon={<FaHeart />} />
                        <HStack spacing={1} align="center">
                            <IconButton size="sm" color="grey" background={'transparent'} aria-label="Comment" icon={<FaComment />} />
                            <Text fontSize="sm" color="gray">300 Replies</Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Box>

            <Divider my={4} />
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
                                value={newComment}
                                onChange={handleCommentChange}
                                bg="black"
                                color="white"
                                borderRadius="md"
                                border={'1px grey solid'}
                                pr="120px" // Space for icon and button
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCommentSubmit();
                                    }
                                }}
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
                                        onChange={handleImageChange}
                                    />
                                    <Button
                                        bg="brand.main"
                                        color="white"
                                        p={3}
                                        onClick={handleCommentSubmit}
                                        size="xs"
                                        borderRadius="full"
                                        _hover={{ bg: 'green.400' }}

                                    >
                                        Reply
                                    </Button>
                                </HStack>
                            </InputRightElement>
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
            </Box>




            <VStack spacing={3} align="start">
                {comments.map((comment) => (
                    <Box key={comment.id} p={2} borderRadius="md" width="full">
                        <HStack spacing={2}>
                            <Avatar size="sm" name={comment.username} />
                            <Text fontWeight="bold">{comment.username}</Text>
                            <Text fontSize={'small'} color={'grey'}>{comment.email}</Text>
                            <Text color="gray" fontSize={'small'}>2h</Text>
                        </HStack>
                        <Text mt={1}>{comment.text}</Text>
                        <Divider my={4} />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}
