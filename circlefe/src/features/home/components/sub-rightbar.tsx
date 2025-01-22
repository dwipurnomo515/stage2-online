// src/components/Rightbar.tsx
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SuggestedUser } from '../types/suggested';
import { apiV1 } from '../../../libs/api';
import FollowButton from '../button/follow';

export function SubRightbar() {

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const response = await apiV1.get<SuggestedUser[]>('/users/suggested');
                if (response.status === 200) {
                    console.log("Fetched users:", response.data); // Pastikan data di sini lengkap
                    setSuggestedUsers(response.data);
                    console.log("State after setting:", suggestedUsers); // Cek state setelah set

                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching suggested users:", error);
            }
        };

        fetchSuggestedUsers();
    }, []);
    useEffect(() => {
        console.log("Updated suggestedUsers:", suggestedUsers);
    }, [suggestedUsers]);

    return (
        <Box
            w="350px" // Lebar card
            bg="black" // Background untuk keseluruhan Rightbar
            boxShadow="md"
            borderRadius="md"
        >


            {/* Suggested Users Section */}
            <Box
                p={4}
                borderRadius="md"
                border="1px solid black"
                bg="#262626" // Background color untuk suggestion card
                color="white"
                mb={6}
            >
                <Text fontSize="lg" fontWeight="bold">Suggested for You</Text>

                <VStack spacing={1} align="stretch">
                    {Array.isArray(suggestedUsers) && suggestedUsers.map((user) => (
                        <Box key={user.id} display="flex" alignItems="center" p={2} borderRadius="md" bg="transparent">
                            <Avatar size="sm" name={user.fullName} src={user.profileImage || ''} mr={3} />
                            <VStack spacing={1} align="start" flex="1">
                                <Text fontSize="sm" fontWeight="bold">{user.fullName}</Text>
                                <Text fontSize="xs" color="gray.400">{user.email}</Text>

                            </VStack>
                            <Box bg={'none'}>
                                <FollowButton userId={user.id} />
                            </Box>

                        </Box>
                    ))}
                </VStack>
            </Box>

            {/* Footer Section */}
            <Box
                p={1}
                pl={2}
                borderRadius="sm"
                border="1px solid black"
                bg="#262626" // Background color untuk credit card
                color="white"
                fontSize="sm"

            >
                <HStack mt={2}>
                    <Text fontSize="sm" color="gray.500"> Developed by Dwi Purnomo </Text>
                    <BsGithub size={16} color="gray.500" />
                    <FaLinkedin size={16} color="gray.500" />
                    <FaInstagram size={16} color="gray.500" />
                </HStack>
                <Text fontSize="xs" color="gray.500" mt={1}>
                    Powered by DumbWays Indonesia - al Coding Bootcamp
                </Text>
            </Box>
            <Box mt={8}>  </Box>
        </Box>
    );
}
