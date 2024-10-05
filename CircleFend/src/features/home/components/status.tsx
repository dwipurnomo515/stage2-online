// src/components/PostDetail.tsx
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Divider, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaComment, FaHeart, FaImage } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { apiV1 } from '../../../libs/api';
import { ThreadEntity } from '../../../entities/thread';
import { useHome } from '../hooks/use-home';
import { useAppSelector } from '../../../hooks/use-store';

interface Comment {
    id: number;
    fullName: string;
    content: string;
    email: string;
    image?: string; // Menambahkan opsional untuk gambar

}

export function StatusMainContent() {
    const {
        handleToggleLike,
    } = useHome();

    const { threadId } = useParams<{ threadId: string }>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [thread, setThread] = useState<ThreadEntity | null>(null);
    console.log('Comments:', comments);

    // Ambil userId dari Redux
    const { id } = useAppSelector((state) => state.auth);

    // Fetch thread and comments saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ambil data thread
                const threadResponse = await apiV1.get(`/threads/${threadId}`);
                console.log('Thread Response:', threadResponse.data); // Log response

                setThread(threadResponse.data);

                // Ambil komentar untuk thread tersebut
                const commentsResponse = await apiV1.get(`/threads/${threadId}/comments`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [threadId]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            const formData = new FormData();
            formData.append('content', newComment); // Pastikan ini diisi dengan nilai komentar
            // Tambahkan nilai lain ke formData jika perlu

            try {
                const response = await apiV1.post(`/threads/${threadId}/reply`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setComments([...comments, response.data]); // Pastikan response.data berisi data komentar baru
                setNewComment(''); // Reset input komentar
                setImage(null); // Reset image
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
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

            {/* Menampilkan Thread */}
            {thread && (
                <Box bg="black" p={4} borderRadius="md" mb={4}>
                    <VStack spacing={2} align="start">
                        <HStack spacing={2}>
                            <Avatar size="sm" name={thread.user.fullName} src="https://bit.ly/dan-abramov" />
                            <VStack align="start" ml={2}>
                                <Text fontWeight="bold">{thread.user.fullName}</Text>
                                <Text fontSize={'small'} mt={-2} color={'grey'}> @ {thread.user.fullName}</Text>
                            </VStack>
                        </HStack>
                        <Text>{thread.content}</Text>
                        {thread?.image && (
                            <Image
                                src={thread.image}
                                alt="Thread image"
                                borderRadius="md"
                                maxW="400px"
                                mx="auto"
                            />
                        )}
                        <HStack spacing={4} mt={2}>
                            <HStack spacing={1} align="center">
                                <IconButton size="sm" color="grey" background={'transparent'} aria-label="Like"
                                    onClick={() => handleToggleLike(id, thread.id)} // Menggunakan userId dari Redux
                                    icon={<FaHeart />} />
                                <Text fontSize="sm" color={thread.isLiked ? "red" : "gray"}>{thread.likesCount}</Text>
                            </HStack>
                            <HStack spacing={1} align="center">
                                <IconButton size="sm" color="grey" background={'transparent'} aria-label="Comment" icon={<FaComment />} />
                                <Text fontSize="sm" color="gray">{comments.length} Replies</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </Box>
            )}

            <Divider my={4} />
            <Box mb={6} p={4} borderRadius="md" border="1px solid black" bg="black" color="white">
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
                    </VStack>
                </HStack>
            </Box>

            <VStack spacing={3} align="start">
                {comments.map((comment) => (
                    <Box key={comment.id} p={2} borderRadius="md" width="full">
                        <HStack spacing={2}>
                            <Avatar size="sm" name={comment.fullName} />
                            <Text fontWeight="bold">{comment.fullName}</Text>
                            <Text fontSize={'small'} color={'grey'}>{comment.email}</Text>
                            <Text color="gray" fontSize={'small'}>2h</Text>
                        </HStack>
                        <Text mt={1}>{comment.content}</Text> {/* Menggunakan 'content' dari response */}
                        {comment.image && <Image src={comment.image} alt="Comment image" borderRadius="md" />}
                        <Divider my={4} />
                    </Box>
                ))}

            </VStack>
        </Box>
    );
}
