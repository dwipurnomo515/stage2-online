import React, { useState, useMemo } from 'react';
import { Input, InputGroup, InputLeftElement, Box, Text, List, ListItem, Flex, VStack, Image, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

// Daftar teman dengan detail tambahan dan URL gambar avatar dari sumber online
const friends = [
    { name: 'Dwipurnomo', username: '@dwipurnomo', bio: 'Software Developer', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Alice', username: '@alice', bio: 'Graphic Designer', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bob', username: '@bob', bio: 'Photographer', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Charlie', username: '@charlie', bio: 'Writer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'David', username: '@david', bio: 'Musician', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Eva', username: '@eva', bio: 'Content Creator', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Frank', username: '@frank', bio: 'Entrepreneur', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Grace', username: '@grace', bio: 'Teacher', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

export function SearchMainContent() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Filter saran berdasarkan query
    const filteredFriends = useMemo(() =>
        friends.filter(friend =>
            friend.name.toLowerCase().includes(query.toLowerCase())
        ),
        [query]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelect = (name: string) => {
        setQuery(name);
        setIsFocused(false); // Menutup saran setelah memilih
    };

    return (
        <Box p={4} bg="black" borderRadius="md" color={'white'} boxShadow="md" position="relative">
            <InputGroup>
                <InputLeftElement children={<FaUser color='grey' />} />
                <Input
                    placeholder="Enter friend's name..."
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
                    size="md"
                    borderColor={'grey'}
                />
            </InputGroup>
            {isFocused && query && filteredFriends.length > 0 && (
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    bg="black"
                    color="white"
                    borderRadius="md"
                    boxShadow="md"
                    mt={2}
                    p={2}
                    width="100%"
                >
                    <List spacing={1}>
                        {filteredFriends.map((friend) => (
                            <ListItem
                                key={friend.name}
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: 'gray.900', cursor: 'pointer' }}
                                onClick={() => handleSelect(friend.name)}
                            >
                                <Flex align="center" justify="space-between">
                                    <Flex align="center">
                                        <Image
                                            src={friend.avatar}
                                            alt={`${friend.name}'s avatar`}
                                            borderRadius="full"
                                            boxSize="40px"
                                            mr={2}
                                        />
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">{friend.name}</Text>
                                            <Text color="white">{friend.username}</Text>
                                            <Text color="white" fontSize="sm">{friend.bio}</Text>
                                        </VStack>
                                    </Flex>
                                    <Button
                                        size="sm"
                                        colorScheme="black"
                                        variant="outline"
                                    >
                                        Follow
                                    </Button>
                                </Flex>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
}
