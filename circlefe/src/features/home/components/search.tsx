import React, { useState, useMemo, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement, Box, Text, List, ListItem, Flex, VStack, Image, Button, Center } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { apiV1 } from '../../../libs/api';
import Cookies from 'js-cookie';
import { UserEntity } from '../../../entities/user';
import FollowButton from '../button/follow';

// Daftar teman dengan detail tambahan dan URL gambar avatar dari sumber online


export function SearchMainContent() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [friends, setFriends] = useState<UserEntity[]>([]);
    // Filter saran berdasarkan query

    const loggedUser = JSON.parse(Cookies.get("user") || '{}');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await apiV1.get(`/search?q=${query}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });

                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);

            }
        };

        if (query) {
            fetchFriends(); // Lakukan fetch hanya jika ada query
        } else {
            setFriends([]); // Kosongkan hasil jika query kosong
        }
    }, [query]);




    const filteredFriends = useMemo(() =>
        friends.filter(friend =>
            friend.fullName && friend.fullName.toLowerCase().includes(query.toLowerCase()) &&
            friend.fullName !== loggedUser.fullName
        ),
        [query, friends]
    );

    useEffect(() => {
        console.log("filtered friends", filteredFriends);

    }, [filteredFriends]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelect = (fullName: string) => {
        setQuery(fullName);
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
            {isFocused && (
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
                    {query ? (
                        filteredFriends.length > 0 ? (
                            <List spacing={1}>
                                {filteredFriends.map((friend) => (
                                    <ListItem
                                        key={friend.fullName}
                                        p={2}
                                        borderRadius="md"
                                        _hover={{ bg: 'gray.900', cursor: 'pointer' }}
                                        onClick={() => handleSelect(friend.fullName)}
                                    >
                                        <Flex align="center" justify="space-between">
                                            <Flex align="center">
                                                <Image
                                                    src={friend.profileImage}
                                                    alt={`${friend.userName}'s avatar`}
                                                    borderRadius="full"
                                                    boxSize="40px"
                                                    mr={2}
                                                />
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="bold">{friend.userName}</Text>
                                                    <Text color="white">{friend.email}</Text>
                                                    <Text color="white" fontSize="sm">{friend.bio}</Text>
                                                </VStack>
                                            </Flex>
                                            <FollowButton userId={friend.id} />

                                        </Flex>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Center>
                                <Text color={'white'} fontSize={"medium"}>User not found</Text>
                            </Center>
                        )
                    ) : null}
                </Box>
            )}
        </Box>
    );
}
