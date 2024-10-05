// src/components/Rightbar.tsx
import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export function SubRightbar() {
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
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Box key={item} display="flex" alignItems="center" p={2} borderRadius="md" bg="transparent">
                            <Avatar size="sm" name={`User ${item}`} src={`https://bit.ly/dan-abramov`} mr={3} />
                            <VStack spacing={1} align="start" flex="1">
                                <Text fontSize="sm" fontWeight="bold">User {item}</Text>
                                <Text fontSize="xs" color="gray.400">user{item}@example.com</Text>
                            </VStack>
                            <Button
                                ml="auto"
                                size="sm"
                                colorScheme="white"
                                variant={item === 1 ? "solid" : "outline"} // "Following" untuk pengguna pertama
                                borderColor="white"
                                color={item === 1 ? "white" : "white.400"}
                                borderRadius="full"
                                _hover={{ borderColor: item === 1 ? 'white.400' : 'white', color: item === 1 ? 'white.400' : 'white' }}
                            >
                                {item === 1 ? "Following" : "Follow"}
                            </Button>
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
